"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Prescription extends Model {
    static associate(models) {
      Prescription.belongsTo(models.Doctor, {
        foreignKey: "DoctorId",
        as: "doctor",
      });
    }
  }
  Prescription.init(
    {
      tanggal: DataTypes.DATE,
      obat1: DataTypes.STRING,
      obat2: DataTypes.STRING,
      obat3: DataTypes.STRING,
      obat4: DataTypes.STRING,
      nama_pasien: DataTypes.STRING,
      tanggal_lahir: DataTypes.DATE,
      alamat: DataTypes.TEXT,
      DoctorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Prescription",
    }
  );
  return Prescription;
};
