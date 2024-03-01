'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Komentar extends Model {
    static associate(models) {
      Komentar.hasMany(models.Balasan, { foreignKey: 'komentarId' });
    }
  }
  Komentar.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    isi: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Komentar',
  });
  return Komentar;
};
