const config = require("../config");
const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  database: config.db.name,
  username: config.db.username,
  password: config.db.password,
  host: config.db.host,
});

class Kitten extends Model {}
Kitten.init(
  {
    name: DataTypes.STRING,
    age: DataTypes.NUMBER,
  },
  { sequelize, modelName: "Kitten" }
);

module.exports = {
  sequelize,
  Kitten,
};
