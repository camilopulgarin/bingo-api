'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Modifica el ENUM del campo status en GameUsers para agregar 'pending'
    await queryInterface.changeColumn('GameUsers', 'status', {
      type: Sequelize.ENUM('playing', 'won', 'lost', 'pending', 'configured', 'completed'),
      allowNull: false,
      defaultValue: 'pending',
    });
  },

  async down (queryInterface, Sequelize) {
    // Revierte el ENUM del campo status en GameUsers a los valores originales
    await queryInterface.changeColumn('GameUsers', 'status', {
      type: Sequelize.ENUM('playing', 'won', 'lost', 'pending', 'configured', 'completed'),
      allowNull: false,
      defaultValue: 'playing',
    });
  }
};
