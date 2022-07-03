module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define(
    "Offer",
    {
      ID: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  return Offer;
};
