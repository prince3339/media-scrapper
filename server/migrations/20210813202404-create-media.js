module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('medias', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      title: Sequelize.STRING(1000),
      mediaUrl: Sequelize.STRING(2048),
      webUrl: Sequelize.STRING(2048),
      type: {
        type: Sequelize.ENUM({
          values: ['IMAGE', 'VIDEO']
        }),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('medias');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_medias_type";'
    );
  }
};
