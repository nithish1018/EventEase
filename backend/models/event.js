'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
    static addTask({ title, startTime, endTime, userId }) {
      return this.create({
        title,
        startTime,
        endTime,
        userId,
      });
    }

    static removeTask({ id, userID }) {
      return this.destroy({
        where: {
          id,
          userID,
        },
      });
    }

    static getTasks(userID) {
      return this.findAll({
        where: {
          userID,
        },
        order: [["id", "ASC"]],
      });
    }

    static getTaskAtSlot({ startTime, endTime, userID }) {
      return this.findOne({
        where: {
          startTime,
          endTime,
          userID
        },
      });
    }

    static getTask({ userID, id }) {
      return this.findOne({
        where: {
          userID,
          id,
        },
      });
    }

    static async updateTask({ title, id, userID }) {
      return this.update(
        {
          title,
        },
        {
          where: {
            id,
            userID
          },
        }
      );
    }

  }
  Event.init({
    title: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};