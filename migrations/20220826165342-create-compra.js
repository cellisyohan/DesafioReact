'use strict';
module.exports = {
  up : async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Compras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CartaoId:{
        primaryKey:Sequelize.INTEGER,
        type:Sequelize.INTEGER,
        constraints: true,
        references:{
          model: 'cartaos',
          key: 'id'
        },
        OnUpdate:'CASCADE',
        OnDelete:'CASCADE'
      },
      PromocaoId:{
        primaryKey:Sequelize.INTEGER,
        type:Sequelize.INTEGER,
        constraints: true,
        references:{
          model: 'promocaos',
          key: 'id'
        },
        OnUpdate:'CASCADE',
        OnDelete:'CASCADE'
      },
      data: {
        type: Sequelize.DATEONLY
      },
      quantidade: {
        type: Sequelize.INTEGER
      },
      valor: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down : async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('Compras');
  }
};