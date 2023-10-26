module.exports = (sequelize, DataTypes) => {
    // In MySQL, users table will be created.
    // User -> first letter should be changed to lowercase and singular should be changed to plural.
    const User = sequelize.define(
        "User",
        {
            // id is automatically created.
            email: {
                type: DataTypes.STRING(30),
                allowNull: false, // Required
                unique: true, // Unique
            },
            nickname: {
                type: DataTypes.STRING(30),
                allowNull: false, // Required
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false, // Required
            },
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci", // For Korean
        },
    );
    User.associate = (db) => {};
    return User;
};
