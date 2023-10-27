module.exports = (sequelize, DataTypes) => {
    // In MySQL, users table will be created.
    // User -> first letter should be changed to lowercase and singular should be changed to plural.
    const Image = sequelize.define(
        "Image",
        {
            // id is automatically created.
            content: {
                type: DataTypes.STRING(200),
            },
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
        },
    );
    Image.associate = (db) => {
        db.Image.belongsTo(db.Post);
    };
    return Image;
};
