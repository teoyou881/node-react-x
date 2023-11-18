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
            limit: 11,

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

        // if there are more posts, then more is true.
        if (posts.length === 11) {
            more = true;
            posts.pop();
        }

        res.status(200).json({ posts, more });
    } catch (e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;
