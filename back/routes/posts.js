const express = require("express");
const router = express.Router();
const { Post, User, Image, Comment } = require("../models");

router.get("/", async (req, res, next) => {
    const posts = await Post.findAll({
        // limit, offset could be used for pagination. but it is not used in this project.
        // Because this could cause a problem when the post is created or deleted.
        // limit:10,offset:0,

        //In real world, it is better to use lastId instead of offset.

        limit: 10,
        order: [
            ["createdAt", "DESC"],
            [Comment, "createdAt", "DESC"],
        ],
        include: [
            { model: User, attributes: ["id", "nickname"] },
            { model: Image },
            {
                model: Comment,
                include: [{ model: User, attributes: ["id", "nickname"] }],
            },
        ],
    });
    res.status(200).json(posts);
});

module.exports = router;
