const express = require('express');
const router = express.Router();
const { Post, User, Image, Comment, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');
const { Model } = require('sequelize');
const multer = require('multer');
// multer-s3 is for uploading images to aws s3
const multerS3 = require('multer-s3');
// aws-sdk is for getting access to aws s3
const AWS = require('aws-sdk');
const path = require('path');
// can use fs to manipulate files
const fs = require('fs');

try {
  fs.accessSync('uploads');
} catch (e) {
  console.log('There is no uploads folder. Create uploads folder');
  fs.mkdirSync('uploads');
}

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();

const uploadS3 = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'teonodex',
    key(req, file, cb) {
      // we can create folder in s3
      cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`);
    },
    limits: { fileSize: 20 * 1024 * 1024 },
  }),
});

// upload file to a local storage using multer
/*
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, "uploads");
        },
        filename(req, file, done) {
            // Teo.jpg
            const ext = path.extname(file.originalname); // extract extension name  jpg
            const basename = path.basename(file.originalname, ext); // extract file name without extension  Teo
            done(null, basename + "_" + new Date().getTime() + ext); // Teo123123123.jpg
        },
    }),
    // Processing images and videos is very taxing on the server.
    // For larger services, you should consider pushing them to the cloud directly from your props.
    limits: { fileSize: 20 * 1024 * 1024 },
});
 */

// upload file to aws s3 using multer-s3
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },
});

// uploads folder has images. file can be cashed in the server. But, db can't.
// db has images url
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    // We must check if there is a hashtag. If there is a hashtag, hashtags will be null.
    if (hashtags) {
      // no hashtag matched, create it.
      // hashtag matched, get it.
      // we need to findOrCreate it.
      // findOrCreate returns array.
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          }),
        ),
      );
      // findOrCreate returns array. --> [[node, true], [react, true]]
      await post.addHashtags(result.map((v) => v[0]));
    }

    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        //determines whether the passed value is an array.
        // if image is an array (multiple images)
        // Image.create({ src: image }) function returns a promise
        const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }

    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        { model: Image },
        {
          model: Comment,
          include: [{ model: User, attributes: ['id', 'nickname'] }],
        },
        // user who create the post
        { model: User, attributes: ['id', 'nickname'] },
        // user who click like button
        { model: User, as: 'Likers', attributes: ['id'] },
      ],
    });
    res.status(201).json(fullPost);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('There is no post');
    }
    await Post.destroy({ where: { id: req.params.postId } });
    res.json({
      PostId: parseInt(req.params.postId, 10),
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('There is no post');
    }
    const comment = await Comment.create({
      content: req.body.content,
      UserId: req.user.id,
      //postId is int type, but req.params.postId is string type.
      // So, we need to convert it to int type.
      PostId: Number.parseInt(req.params.postId),
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{ model: User, attributes: ['id', 'nickname'] }],
    });
    console.log(fullComment);
    res.status(201).json(fullComment);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('There is no post');
    }
    await post.addLikers(req.user.id);
    res.status(201).json({ PostId: post.id, UserId: req.user.id });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('There is no post');
    }
    await post.removeLikers(req.user.id);
    res.status(201).json({ PostId: post.id, UserId: req.user.id });
  } catch (e) {
    console.log(e);
  }
});

// multiple images upload: upload.array('image')
// single image upload: upload.single('image')
// only text like json: upload.none()
// router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
//   // under code is for local storage
//   // res.json(req.files.map((v) => v.filename));
//
//   const uploadedFiles = req.files;
//   const uploadedFileURLs = [];
//
//   uploadedFiles.forEach((file) => {
//     const params = {
//       Bucket: 'teonodex',
//       // key is file name which should be unique, we use Date.now() to make it unique
//       Key: `original/${Date.now()}_${path.basename(file.originalname)}`,
//       // body is file itself
//       Body: file.buffer,
//     };
//
//     s3.upload(params, (err, data) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send('Error uploading file');
//       }
//
//       // File uploaded successfully, get the URL
//       // Now we upload image to s3 original folder and s3 triggers lambda function.
//       // lambda function will resize image and upload it to s3 thumb folder.
//       // Here, we need to get the url of the resized image.
//       const fileURL = data.Location.replace(/\/original\//, '/thumb/');
//       uploadedFileURLs.push(fileURL);
//
//       if (uploadedFileURLs.length === uploadedFiles.length) {
//         console.log(uploadedFileURLs);
//         res.json(uploadedFileURLs);
//       }
//     });
//   });
// });

router.post('/images', isLoggedIn, uploadS3.array('image'), (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map((v) => v.location.replace(/\/original\//, '/thumb/')));
});

router.post(`/:postId/retweet`, isLoggedIn, async (req, res, next) => {
  const post = await Post.findOne({
    where: { id: req.params.postId },
    include: [
      {
        model: Post,
        as: 'Retweet',
      },
    ],
  });
  if (!post) {
    return res.status(403).send('There is no post');
  }
  // user can't retweet their own post.
  // user can't retweet other user's retweet which retweet their post.
  if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
    return res.status(403).send("Can't retweet your post");
  }
  // If you're re-tweeting a retweeted post, get the original post ID.
  // Otherwise, get the post ID.
  const retweetTargetId = post.RetweetId || post.id;
  // check if the post is already retweeted
  // if the post is already retweeted, don't retweet it again.
  const exPost = await Post.findOne({
    where: {
      UserId: req.user.id,
      RetweetId: retweetTargetId,
    },
  });
  if (exPost) {
    return res.status(403).send('Already retweeted');
  }
  const retweet = await Post.create({
    UserId: req.user.id,
    RetweetId: retweetTargetId,
    content: 'retweet',
  });
  const retweetWithPrevPost = await Post.findOne({
    where: { id: retweet.id },
    include: [
      {
        model: Post,
        as: 'Retweet',
        include: [
          {
            model: User,
            attributes: ['id', 'nickname'],
          },
          { model: Image },
        ],
      },
      {
        model: User,
        attributes: ['id', 'nickname'],
      },
      { model: Image },
      {
        model: Comment,
        include: [{ model: User, attributes: ['id', 'nickname'] }],
      },
      { model: User, as: 'Likers', attributes: ['id'] },
    ],
  });
  res.status(201).json(retweetWithPrevPost);
});

// get one post by postId
router.get('/:postId', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        { model: User, attributes: ['id', 'nickname'] },
        { model: Image },
        {
          model: Comment,
          include: [{ model: User, attributes: ['id', 'nickname'] }],
        },
        { model: User, as: 'Likers', attributes: ['id'] },
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            { model: Image },
          ],
        },
      ],
    });
    if (!post) res.status(404).send('There is no post');
    res.status(200).json(post);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
