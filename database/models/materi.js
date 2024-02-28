'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Materi.init({
    jenjang: DataTypes.STRING,
    tanggal: DataTypes.DATE,
    judul: DataTypes.STRING,
    isi: DataTypes.STRING,
    file: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Materi',
  });
  return Materi;
};