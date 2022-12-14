'use strict';
module.exports = {
  up : async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cartaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ClienteId:{
        type:Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'clientes',
          key: 'id'
        },
        OnUpdate:'CASCADE',
        OnDelete:'CASCADE'
      },
      dataCartao: {
        type: Sequelize.DATEONLY
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
    await queryInterface.dropTable('Cartaos');
  }
};