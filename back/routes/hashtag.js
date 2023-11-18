const express = require("express");
const router = express.Router();
const { Post, User, Image, Comment, Hashtag } = require("../models");
const { Op } = require("sequelize");

router.get("/:hashtag", async (req, res, next) => {
    try {
        console.log("req.params.hashtag: ", req.params.hashtag);
        const hashtag = await Hashtag.findOne({
            where: { name: req.params.hashtag },
        });
        if (!hashtag) {
            return res.status(404).send("No hashtag exists.");
        }

        const lastId = parseInt(req.query.lastId, 10);
        const where = {};
        if (lastId) {
            where.id = { [Op.lt]: lastId };
        }
        let more = false;
        const posts = await Post.findAll({
            where: where,
            limit: 11,
            order: [
                ["id", "DESC"],
                ["createdAt", "DESC"],
            ],
            include: [
                // We can use where clause in include.
                {
                    model: Hashtag,
                    where: { name: req.params.hashtag },
                    attributes: ["id", "name"],
                },
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
