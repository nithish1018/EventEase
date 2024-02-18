'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Events", "userId", {
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.addConstraint("Events", {
      fields: ["userId"],
      type: "foreign key",
      onDelete: "CASCADE",
      references: {
        table: "Users",
        field: "id",
      },
    });
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Events", "userId");


  }
};
