const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Media.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      title: DataTypes.STRING(1000),
      mediaUrl: DataTypes.STRING(2048),
      webUrl: DataTypes.STRING(2048),
      type: {
        type: DataTypes.ENUM({
          values: ['IMAGE', 'VIDEO']
        }),
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'medias',
      modelName: 'Media'
    }
  );
  return Media;
};
