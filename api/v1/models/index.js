const dbConfig = require("../config/dbconfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database...");
  })
  .catch(err => {
    console.log("Error with connecting to database!!!" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.auctions = require("./auctionModel.js")(sequelize, DataTypes);
db.offers = require("./offerModel.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

db.auctions.hasMany(db.offers, {
  as: "Offers",
  foreignKey: { allowNull: false, name: "auctionId" },
});

db.offers.belongsTo(db.auctions, {
  as: "Auction",
  foreignKey: { allowNull: false, name: "auctionId" },
});

module.exports = db;
