const { Sequelize } = require('sequelize');
const wrapper = require("../../utils/wrapper");

const connection = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.HOST,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

const init = async () => {
  try {
    connection.sync();
    await connection.authenticate();
  } catch (error) {
    wrapper.error(`Failed connect to database MySQL, ${error}`);
  }
};
init();

module.exports = connection;
