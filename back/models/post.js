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
        db.Post.belongsTo(db.User); // A post belongs to a user.
        db.Post.hasMany(db.Comment); // A post has many comments.
        db.Post.hasMany(db.Image); // A post has many comments.
        db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // A post belongs to many hashtags.
        db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); // A post belongs to many users as likers.
        db.Post.belongsTo(db.Post, { as: "Retweet" }); // A post belongs to a post as retweet.
    };
    return Post;
};
