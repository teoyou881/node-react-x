const express = require("express");
const app = express();
const postRouter = require("./routes/post");

app.use("/post", postRouter);
app.get("/", (req, res) => {
    res.end("hi express");
});

app.listen(3065, () => {
    console.log("Server is running on http://localhost:3065");
});
