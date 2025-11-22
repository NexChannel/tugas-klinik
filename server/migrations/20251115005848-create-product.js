"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Patients", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_pasien: {
        type: Sequelize.STRING,
      },
      obat: {
        type: Sequelize.STRING,
      },
      keluhan: {
        type: Sequelize.TEXT,
      },
      DoctorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Doctors",
          key: "id",
        },
        allowNull: true,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Patients");
  },
};
