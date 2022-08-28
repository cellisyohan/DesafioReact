'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promocao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Promocao.belongsToMany(models.Cartao,
        {foreignKey:'Cartao_Id', through:'Compra', as:'cartao_Promocao'});
      Promocao.belongsTo(models.Empresa,
        {foreignKey:'Empresa_Id', as:'promocao_Empresa'});
      Promocao.hasMany(models.Compra,
        {foreignKey:'Promocao_Id', as:'promocao_Compra'});
    }
  }
  Promocao.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    validade: DataTypes.DATEONLY,
    //Empresa_Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Promocao',
  });
  return Promocao;
};