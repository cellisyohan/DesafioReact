'use strict';
module.exports = {
  up : async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Promocaos',{
      EmpresaId:{
        type:Sequelize.INTEGER,
        allowNull: true,
        references:{
          model: 'empresas',
          key: 'id'
        },
        OnUpdate:'CASCADE',
        OnDelete:'CASCADE'
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      validade: {
        type: Sequelize.DATEONLY 
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
  down : async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Promocaos');
  }
};