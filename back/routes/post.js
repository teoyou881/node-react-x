const express = require("express");
const router = express.Router();
const { Post, User, Image, Comment } = require("../models");
const { isLoggedIn } = require("./middlewares");
const { Model } = require("sequelize");
router.post("/", isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [
                { model: Image },
                {
                    model: Comment,
                    include: [{ model: User, attributes: ["id", "nickname"] }],
                },
                { model: User, attributes: ["id", "nickname"] },
            ],
        });
        res.status(201).json(fullPost);
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

module.exports = router;
