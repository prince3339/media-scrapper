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
      title: DataTypes.STRING,
      mediaUrl: DataTypes.STRING,
      webUrl: DataTypes.STRING,
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
      modelName: 'Media',
      timestamps: false
    }
  );
  return Media;
};
