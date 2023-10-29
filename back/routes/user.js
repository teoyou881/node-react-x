const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");

router.post("/", async (req, res, next) => {
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

router.post("/login", (req, res, next) => {
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
            return req.login(user, async (loginErr) => {
                // this process is not our business
                // passport will handle this
                if (loginErr) {
                    console.error(loginErr);
                    return next(loginErr);
                }
                const fullUserWithoutPassword = await User.findOne({
                    where: { id: user.id },
                    attributes: {
                        exclude: ["password"],
                    },
                });
                return res.status(200).json(fullUserWithoutPassword);
            });
        },
        () => {},
    )(req, res, next);
});

router.post("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/");
    });
});

module.exports = router;
