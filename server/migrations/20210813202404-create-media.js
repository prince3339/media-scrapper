module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('medias', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      title: Sequelize.STRING,
      mediaUrl: Sequelize.STRING,
      webUrl: Sequelize.STRING,
      type: {
        type: Sequelize.ENUM({
          values: ['IMAGE', 'VIDEO']
        }),
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
