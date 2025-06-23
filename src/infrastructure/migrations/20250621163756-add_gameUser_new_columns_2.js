'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('GameUsers', 'selected_tables', {
      type: Sequelize.JSON,
      allowNull: true,
    });

    await queryInterface.addColumn('GameUsers', 'game_mode_vote', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('GameUsers', 'board_count', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('GameUsers', 'selected_tables');
    await queryInterface.removeColumn('GameUsers', 'game_mode_vote');
    await queryInterface.removeColumn('GameUsers', 'board_count');
  }
};
