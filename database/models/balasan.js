'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Balasan extends Model {
    static associate(models) {
      Balasan.belongsTo(models.Komentar, { foreignKey: 'komentarId' });
    }
  }
  Balasan.init({
    isi: DataTypes.TEXT,
    komentarId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Balasan',
  });
  return Balasan;
};
