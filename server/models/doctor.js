"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    static associate(models) {
      Doctor.hasMany(models.Patient, {
        foreignKey: "DoctorId",
        as: "patients",
      });
    }
  }
  Doctor.init(
    {
      nama: DataTypes.STRING,
      spesialisasi: DataTypes.STRING,
      analisa: DataTypes.TEXT,
      nomor_hp: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Doctor",
    }
  );
  return Doctor;
};
