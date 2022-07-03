const db = require("../models");
const { uuid } = require("uuidv4");
const { Op } = require("sequelize");

const Auction = db.auctions;
const Offer = db.offers;

const addAuction = async (req, res) => {
  let data = {
    ID: uuid(),
    Name: req.body.Name,
    Institution: req.body.Institution,
    Description: req.body.Description,
    DateStart: req.body.DateStart,
    DateEnd: req.body.DateEnd,
    MaxPrice: req.body.MaxPrice,
  };

  const auction = await Auction.create(data)
    .then(auction => {
      res.status(200).send({
        status: 200,
        auction: auction,
      });
    })
    .catch(err => {
      res.send({
        error: err,
      });
    });
};

const getAllAuctions = async (req, res) => {
  let auctions = await Auction.findAll()
    .then(auctions => {
      res.status(200).send({
        success: "Success",
        message: "auctions",
        auctions: auctions,
      });
    })
    .catch(err => {
      res.send({
        error: err,
      });
    });
};

const getAllClosedAuctions = async (req, res) => {
  const dateNow = new Date(Date.now());
  let closed_auctions = await Auction.findAll({
    where: {
      dateEnd: {
        [Op.lte]: dateNow,
      },
    },
  });

  res.status(200).send({
    status: 200,
    message: "closed_auctions",
    closed_auctions: closed_auctions,
  });
};

const getAllNotClosedAuctions = async (req, res) => {
  const dateNow = new Date(Date.now());
  let not_closed_auctions = await Auction.findAll({
    where: {
      dateEnd: {
        [Op.gte]: dateNow,
      },
    },
  });
  res.status(200).send({
    status: 200,
    message: "not_closed_auctions",
    not_closed_auctions: not_closed_auctions,
  });
};

const getOneAuction = async (req, res) => {
  let id = req.params.id;
  let auction = await Auction.findOne({ where: { id: id } });
  const dateNow = new Date(Date.now());
  const isLower = dateNow <= auction.DateEnd;
  const offers = await Offer.findAll({ where: { auctionId: id } });
  const filteredOffers = offers
    .filter(offer => offer.Price <= auction.MaxPrice)
    .sort((a, b) => (a.Price < b.Price ? 1 : -1));

  res.status(200).send({
    status: 200,
    auctionDetails: auction,
    isOfferAvailable: isLower,
    offersArray: filteredOffers,
  });
};

module.exports = {
  addAuction,
  getAllAuctions,
  getOneAuction,
  getAllClosedAuctions,
  getAllNotClosedAuctions,
};
