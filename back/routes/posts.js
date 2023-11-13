const express = require("express");
const router = express.Router();
const { Post, User, Image, Comment } = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res, next) => {
    try {
        let lastId = parseInt(req.query.lastId, 10);
        const where = {};
        if (lastId) {
            where.id = { [Op.lt]: lastId };
        }
        let more = false;
        const posts = await Post.findAll({
            // limit, offset could be used for pagination. but it is not used in this project.
            // Because this could cause a problem when the post is created or deleted.
            // limit:10,offset:0,

            //In real world, it is better to use lastId instead of offset.
            where: where,
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
                { model: User, as: "Likers", attributes: ["id"] },
                {
                    model: Post,
                    as: "Retweet",
                    include: [
                        {
                            model: User,
                            attributes: ["id", "nickname"],
                        },
                        { model: Image },
                    ],
                },
            ],
        });

        // If there are 10 posts, should check there are more posts after 10 posts.
        // if there are 11 posts, then there are more posts. otherwise, there are no more posts.
        if (posts.length === 10) {
            const morePosts = await Post.findAll({
                where: where,
                limit: 11,
            });
            if (morePosts.length === 11) {
                more = true;
            }
        }

        res.status(200).json({ posts, more });
    } catch (e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;
