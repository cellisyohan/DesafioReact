'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Compras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Cartao_Id:{
        primaryKey:Sequelize.INTEGER,
        type:Sequelize.INTEGER,
        references:{
          model: 'cartaos',
          key: 'id'
        },
        OnUpdate:'CASCADE',
        OnDelete:'CASCADE'
      },
      Promocao_Id:{
        primaryKey:Sequelize.INTEGER,
        type:Sequelize.INTEGER,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Compras');
  }
};