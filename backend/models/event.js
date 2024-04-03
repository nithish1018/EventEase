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

    static removeTask({ id, userId }) {
      return this.destroy({
        where: {
          id,
          userId,
        },
      });
    }

    static getTasks(userId) {
      return this.findAll({
        where: {
          userId,
        },
        order: [["id", "ASC"]],
      });
    }

    static getTaskAtSlot({ startTime, endTime, userId }) {
      return this.findOne({
        where: {
          startTime,
          endTime,
          userId
        },
      });
    }

    static getTask({ userId, id }) {
      return this.findOne({
        where: {
          userId,
          id,
        },
      });
    }

    static async updateTask({ title, id, userId }) {
      return this.update(
        {
          title,
        },
        {
          where: {
            id,
            userId
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