module.exports = (sequelize, DataTypes) => {
    // In MySQL, users table will be created.
    // User -> first letter should be changed to lowercase and singular should be changed to plural.
    const Post = sequelize.define(
        "Post",
        {
            // id is automatically created.
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci", // For emoji
        },
    );
    Post.associate = (db) => {
        // sequelize provides add/get/set/add/remove methods.
        // Based on relationship, singular or plural should be used.
        // post.addUser, post.getUser, post.setUser, post.addUser, post.removeUser
        // post.addComments, post.getComments, post.setComments, post.addComments, post.removeComments
        db.Post.belongsTo(db.User); // A post belongs to a user.
        db.Post.hasMany(db.Comment); // A post has many comments.
        db.Post.hasMany(db.Image); // A post has many comments.
        db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // A post belongs to many hashtags.
        db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); // A post belongs to many users as likers.
        db.Post.belongsTo(db.Post, { as: "Retweet" }); // A post belongs to a post as retweet.
    };
    return Post;
};
