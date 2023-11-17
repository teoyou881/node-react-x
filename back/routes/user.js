const express = require("express");
const router = express.Router();
const { User, Post, Comment, Image } = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

// If user is logged in, send user info
// If user is not logged in, send null
router.get("/", async (req, res, next) => {
    // when server side rendering, cookie is in req.headers.
    // At front side, if user don't set it, cookie is not in req.headers.
    // After adding under code
    // axios.defaults.headers.Cookie = req ? req.headers.cookie : ""; in front side,
    // cookie is in req.headers.
    // console.log(req.headers);
    try {
        const user = await User.findOne({
            where: { id: req.user?.id || null },
        });
        if (!user) {
            return res.status(200).json(null);
        }
        const userWithoutPassword = await User.findOne({
            where: { id: user.id },
            attributes: {
                exclude: ["password"],
            },
            include: [
                {
                    model: Post,
                    attributes: ["id", "RetweetId"],
                },
                {
                    model: User,
                    as: "Followings",
                    attributes: ["id", "nickname"],
                },
                {
                    model: User,
                    as: "Followers",
                    attributes: ["id", "nickname"],
                },
                {
                    model: Comment,
                    attributes: ["id"],
                },
            ],
        });
        res.status(200).json(userWithoutPassword);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

// find user by userId
// todo
// 1. Based on user preference, show posts
// 2. Based on user preference, show followings
// 3. Based on user preference, show followers
router.get("/info/:userId", async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: parseInt(req.params.userId, 10) },
        });
        if (!user) {
            return res.status(200).json(null);
        }
        const userWithoutPassword = await User.findOne({
            where: { id: user.id },
            attributes: {
                exclude: ["password"],
            },
            include: [
                {
                    model: Post,
                    attributes: ["id"],
                },
                {
                    model: User,
                    as: "Followings",
                    attributes: ["id", "nickname"],
                },
                {
                    model: User,
                    as: "Followers",
                    attributes: ["id", "nickname"],
                },
            ],
        });
        res.status(200).json(userWithoutPassword);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.post("/", isNotLoggedIn, async (req, res, next) => {
    try {
        await User.findOne({
            where: { email: req.body.email },
        }).then((user) => {
            if (user) {
                return res.status(403).send("Already used email");
            }
        });
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        res.status(200).send("ok");
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// passport.authenticate("local") is a middleware
// To use next(), we have to use a callback function
// In passport.authenticate("local"), the callback function is (err, user, info) => {}
// this callback function is in the local strategy
// client -> server -> passport.authenticate("local") -> callback function
// server error-> err  success -> user  client error -> info

router.post("/login", isNotLoggedIn, (req, res, next) => {
    passport.authenticate(
        "local",
        (err, user, info) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            if (info) {
                return res.status(401).send(info.reason);
            }
            // req.login() is a passport function
            // it calls passport serializeUser()
            return req.login(user, async (loginErr) => {
                // this process is not our business
                // passport will handle this
                if (loginErr) {
                    console.error(loginErr);
                    return next(loginErr);
                }
                const userWithoutPassword = await User.findOne({
                    where: { id: user.id },
                    attributes: {
                        exclude: ["password"],
                    },
                    include: [
                        {
                            model: Post,
                            attributes: ["id", "RetweetId"],
                        },
                        {
                            model: Comment,
                            attributes: ["id"],
                        },
                        {
                            model: User,
                            as: "Followings",
                            attributes: ["id", "nickname"],
                        },
                        {
                            model: User,
                            as: "Followers",
                            attributes: ["id", "nickname"],
                        },
                        // {
                        //     model: Post,
                        //     as: "Retweet",
                        // },
                    ],
                });
                return res.status(200).json(userWithoutPassword);
            });
        },
        () => {},
    )(req, res, next);
});

router.post("/logout", isLoggedIn, (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.send("ok");
    });
});

router.patch("/nickname", isLoggedIn, async (req, res, next) => {
    try {
        const existingUser = await User.findOne({
            where: { nickname: req.body.nickname },
        });

        if (existingUser) {
            return res
                .status(400)
                .json({ error: "Nickname is already in use" });
        }

        await User.update(
            {
                nickname: req.body.nickname,
            },
            {
                where: { id: req.user.id },
            },
        );
        res.status(200).json({
            nickname: req.body.nickname,
            UserId: req.user.id,
        });
    } catch (e) {
        console.log(e);
        next(e);
    }
});

//router for following
router.patch("/:userId/follow", isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.userId },
        });
        if (!user) {
            return res.status(403).send("No user");
        }
        await user.addFollowers(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (e) {
        console.log(e);
        next(e);
    }
});

//router for unfollowing
router.delete("/:userId/follow", isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.userId },
        });
        if (!user) {
            return res.status(403).send("No user");
        }
        await user.removeFollowers(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (e) {
        console.log(e);
        next(e);
    }
});

//router for deleeing followers
router.delete("/follower/:userId", isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.userId },
        });
        if (!user) {
            return res.status(403).send("No user");
        }
        await user.removeFollowings(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (e) {
        console.log(e);
        next(e);
    }
});

//router for getting followers
router.get("/followers", isLoggedIn, async (req, res, next) => {
    try {
        const user = req.user;
        const followers = await user.getFollowers({
            attributes: ["id", "nickname"],
            // limit: parseInt(req.query.limit, 10),
        });
        res.status(200).json(followers);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

//router for getting followings
router.get("/followings", isLoggedIn, async (req, res, next) => {
    try {
        const user = req.user;
        const followings = await user.getFollowings({
            attributes: ["id", "nickname"],
            // limit: parseInt(req.query.limit, 10),
        });
        res.status(200).json(followings);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.get("/:userId/posts/:lastId", async (req, res, next) => {
    console.log(req.params.lastId);
    console.log(req.params.userId);

    try {
        const where = { id: req.params.userId };
        const user = await User.findOne({
            where: where,
        });
        if (!user) {
            return res.status(403).send("There is no user");
        }

        const post = await Post.findAll({
            where: { UserId: req.params.userId },
            offset: 0,
            limit: 10,
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
        console.log(post);
        if (!post) res.status(404).send("There is no post");
        res.status(200).json(post);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;
