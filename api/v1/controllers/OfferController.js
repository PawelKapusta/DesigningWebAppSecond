const db = require("../models");
const { uuid } = require("uuidv4");

const Offer = db.offers;

const addOffer = async (req, res) => {
  const id = req.params.id;

  let data = {
    ID: uuid(),
    Name: req.body.Name,
    Price: req.body.Price,
    Date: new Date(),
    auctionId: id,
  };

  const offer = await Offer.create(data);
  res.status(200).send(offer);
};

const getAllOffers = async (req, res) => {
  const id = req.params.id;

  const offers = await Offer.findAll({ where: { auctionId: id } });
  res.status(200).send(offers);
};

module.exports = {
  addOffer,
  getAllOffers,
};
