'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    //
    static associate(models) {
      User.hasMany(models.Event, {
        foreignKey: "userId"
      })
    }
    static addUser( {name, email, password} ) {
      return this.create({
        name,
        email,
        password
      });
    }
    static getUser(email) {
      return this.findOne({
        where: {
          email
        }
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};