// const {Sequelize} = require('sequelize');
// require("dotenv").config();

// const { DB_HOST,DB_NAME,DB_USERNAME,DB_PASSWORD,DB_DIALECT } =process.env;

// const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
//     host: DB_HOST,
//     dialect: DB_DIALECT,
//     dialectOptions: {
//       ssl: false, // Disable SSL/TLS
//     },
//     logging:false
//   });
// module.exports =sequelize;



const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('inkfactorydev', 'localhost', 'zeeshan12345', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
});

module.exports = sequelize;