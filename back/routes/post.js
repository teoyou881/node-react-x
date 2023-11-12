const express = require("express");
const router = express.Router();
const { Post, User, Image, Comment } = require("../models");
const { isLoggedIn } = require("./middlewares");
const { Model } = require("sequelize");
const multer = require("multer");
const path = require("path");
// can use fs to manipulate files
const fs = require("fs");

try {
    fs.accessSync("uploads");
} catch (e) {
    console.log("There is no uploads folder. Create uploads folder");
    fs.mkdirSync("uploads");
}

//router for uploading images
// for now, save data to hard disk
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

// uploads folder has images. file can be cashed in the server. But, db can't.
// db has images url
router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        if (req.body.image) {
            if (Array.isArray(req.body.image)) {
                //determines whether the passed value is an array.
                // if image is an array (multiple images)
                // Image.create({ src: image }) function returns a promise
                const images = await Promise.all(
                    req.body.image.map((image) => Image.create({ src: image })),
                );
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
                    include: [{ model: User, attributes: ["id", "nickname"] }],
                },
                // user who create the post
                { model: User, attributes: ["id", "nickname"] },
                // user who click like button
                { model: User, as: "Likers", attributes: ["id"] },
            ],
        });
        res.status(201).json(fullPost);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.delete("/:postId", isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (!post) {
            return res.status(403).send("There is no post");
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

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId, UserId: req.user.id },
        });
        if (!post) {
            return res.status(403).send("There is no post");
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
            include: [{ model: User, attributes: ["id", "nickname"] }],
        });
        console.log(fullComment);
        res.status(201).json(fullComment);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.patch("/:postId/like", isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (!post) {
            return res.status(403).send("There is no post");
        }
        await post.addLikers(req.user.id);
        res.status(201).json({ PostId: post.id, UserId: req.user.id });
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.delete("/:postId/like", isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (!post) {
            return res.status(403).send("There is no post");
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
router.post("/images", isLoggedIn, upload.array("image"), (req, res, next) => {
    console.log(req.files);
    res.json(req.files.map((v) => v.filename));
});

module.exports = router;
