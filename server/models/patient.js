"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    static associate(models) {
      Patient.belongsTo(models.Doctor, {
        foreignKey: "DoctorId",
        as: "doctor",
      });
    }
  }
  Patient.init(
    {
      nama_pasien: DataTypes.STRING,
      obat: DataTypes.STRING,
      keluhan: DataTypes.TEXT,
      DoctorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
