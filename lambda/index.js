const AWS = require("aws-sdk");
const sharp = require("sharp");

// lambda upload this source to aws.
// when lambda proceed, it will get my information from aws.
// so, don't need to put config information in this source.
const s3 = new AWS.S3();

exports.handler = async (event, context, cb) => {
    // when upload images to aws s3, it will call this function.
    // event has s3 upload information.
    const Bucket = event.Records[0].s3.bucket.name; // teonodex
    // user can upload file named with korean. Just in case, using decodeURIComponent.
    const Key = decodeURIComponent(event.Records[0].s3.object.key); // original/123123.png
    console.log(Bucket, Key);
    // const filename = Key.split("/")[Key.split("/").at(-1)]; // at() is not working
    const filename = Key.split("/").slice(-1)[0];
    const ext = Key.split(".")[Key.split(".").length - 1].toLowerCase();
    // sharp can't accept jpg. have to change jpg to jpeg.
    const filetype = ext === "jpg" ? "jpeg" : ext;
    console.log("filename", filename, "ext", ext, "filetype", filetype);
    try {
        const s3Object = await s3
            .getObject({
                Bucket,
                Key,
            })
            .promise();
        console.log("image size", s3Object.Body.length);
        const resizedImage = await sharp(s3Object.Body)
            .resize(400, 400, { fit: "inside" })
            .toFormat(filetype)
            .toBuffer();
        await s3
            .putObject({
                Bucket,
                Key: `thumb/${filename}`,
                Body: resizedImage,
            })
            .promise();
        // this return cb is for lambda function.
        // first parameter is error, second parameter is result like passport.
        return cb(null, `thumb/${filename}`);
    } catch (err) {
        console.log(err);
        return cb(err);
    }
};
