const express = require("express");
const router = express.Router();
const { User, Post, Comment } = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

router.get("/", async (req, res, next) => {
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
                    attributes: ["id"],
                },
                {
                    model: User,
                    as: "Followings",
                    attributes: ["id"],
                },
                {
                    model: User,
                    as: "Followers",
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
                            attributes: ["id"],
                        },
                        {
                            model: Comment,
                            attributes: ["id"],
                        },
                        {
                            model: User,
                            as: "Followings",
                            attributes: ["id"],
                        },
                        {
                            model: User,
                            as: "Followers",
                            attributes: ["id"],
                        },
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
        res.status(200).json({ nickname: req.body.nickname });
    } catch (e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;
