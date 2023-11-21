// can't use dotenv in json file
// So, I changed json file to js
// have to add module.exports to js
//

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    development: {
        username: "root",
        password: process.env.DB_PASSWORD,
        database: "react-node-x",
        host: "127.0.0.1",
        port: "3306",
        dialect: "mysql",
    },
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql",
    },
    production: {
        username: "root",
        password: null,
        database: "database_production",
        host: "127.0.0.1",
        dialect: "mysql",
    },
};
