'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    
    static associate(models) {
      // define association here
      Cliente.hasMany(models.Cartao,{
        foreignKey:'CartaoId', as: 'clienteCartao'
      })
    }
  }
  Cliente.init({
    nome: DataTypes.STRING,
    cidade: DataTypes.STRING,
    uf: DataTypes.STRING,
    nascimento: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};