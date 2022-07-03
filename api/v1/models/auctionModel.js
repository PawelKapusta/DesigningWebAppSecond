module.exports = (sequelize, DataTypes) => {
  const Auction = sequelize.define(
    "Auction",
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
      Institution: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DateStart: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      DateEnd: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      MaxPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  return Auction;
};
