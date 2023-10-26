module.exports = (sequelize, DataTypes) => {
    // In MySQL, users table will be created.
    // User -> first letter should be changed to lowercase and singular should be changed to plural.
    const Hashtag = sequelize.define(
        "Hashtag",
        {
            // id is automatically created.
            content: {
                type: DataTypes.STRING(20),
            },
        },
        {
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci", // For emoji
        },
    );
    Hashtag.associate = (db) => {};
    return Hashtag;
};
