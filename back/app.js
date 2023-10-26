const express = require("express");
const app = express();
const postRouter = require("./routes/post");

app.use("/post", postRouter);

server.listen(3065, () => {
    console.log("Server is running on http://localhost:3065");
});
