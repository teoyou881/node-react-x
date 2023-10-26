module.exports = (sequelize, DataTypes) => {
    // In MySQL, users table will be created.
    // User -> first letter should be changed to lowercase and singular should be changed to plural.
    const Comment = sequelize.define(
        "Comment",
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
    Comment.associate = (db) => {};
    return Comment;
};
