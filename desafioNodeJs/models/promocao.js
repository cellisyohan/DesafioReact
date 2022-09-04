'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promocao extends Model {
    static associate(models) {
      // define association here
      Promocao.belongsTo(models.Empresa,{
        foreignKey:'EmpresaId', as: 'promocaoEmpresa'});
      Promocao.hasMany(models.Compra,{
        foreignKey:'PromocaoId', as:'promocaoCompra'});
      Promocao.belongsToMany(models.Cartao,{
        foreignKey:'PromocaoId', through:'CompraId', as:'promocaoCartao'});
    };
  }
  Promocao.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    validade: DataTypes.DATEONLY,
    EmpresaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Promocao',
  });
  return Promocao;
};