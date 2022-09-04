'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //define association here
      Compra.belongsTo(models.Cartao,
        {foreignKey:'CartaoId', as: 'compraCartao'});
      Compra.belongsTo(models.Promocao,  // com o HASMANY não funcionou so com o BELONGSTO
        {foreignKey:'PromocaoId', as:'promocaoCompra'});
    }
  }
  Compra.init({
    data: DataTypes.DATEONLY,
    quantidade: DataTypes.INTEGER,
    valor: DataTypes.FLOAT,
    CartaoId: DataTypes.INTEGER,
    PromocaoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Compra',
  });
  return Compra;
};