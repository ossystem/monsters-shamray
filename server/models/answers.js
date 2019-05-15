module.exports = (sequelize, dataTypes) => {
  const Model = sequelize.define(
    'answers',
    {
      id: {
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        validate: {
          isUUID: 4,
        },
      },
      subject: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      questionerVersion: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      attempt: {
        type: dataTypes.INTEGER(1),
        allowNull: false,
      },
      question: {
        type: dataTypes.INTEGER(1),
        allowNull: false,
      },
      value: {
        type: dataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'answers',
    },
  );

  return Model;
};
