// Extending Model
// Function-based approach

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {}
    Comment.init(
        {
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            modelName: "Comment",
            tableName: "comments",
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci", // For emoji
            sequelize,
        },
    );
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User); // A comment belongs to a user.
        db.Comment.belongsTo(db.Post); // A comment belongs to a post.
    };
    return Comment;
};

// module.exports = (sequelize, DataTypes) => {
//     const Comment = sequelize.define(
//         "Comment",
//         {
//             // id is automatically created.
//             content: {
//                 type: DataTypes.TEXT,
//                 allowNull: false,
//             },
//         },
//         {
//             charset: "utf8mb4",
//             collate: "utf8mb4_general_ci", // For emoji
//         },
//     );
//     Comment.associate = (db) => {
//         db.Comment.belongsTo(db.User); // A comment belongs to a user.
//         db.Comment.belongsTo(db.Post); // A comment belongs to a post.
//     };
//     return Comment;
// };
