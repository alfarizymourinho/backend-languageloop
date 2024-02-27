'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Suhu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Suhu.init({
    tanggal: DataTypes.DATE,
    judul: DataTypes.STRING,
    isi: DataTypes.STRING,
    materi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Suhu',
  });
  return Suhu;
};