const express = require("express");
const router = express.Router();
const { Post, User, Image, Comment } = require("../models");
const { isLoggedIn } = require("./middlewares");
router.post("/", isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        res.status(201).json(post);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });
        if (!post) {
            return res.status(403).send("There is no post");
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: req.params.postId,
            UserId: req.user.id,
        });
        res.status(201).json(comment);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;
