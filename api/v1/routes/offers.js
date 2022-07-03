const offerController = require("../controllers/OfferController");

const express = require("express");
const router = express.Router();

router.post("/:id", offerController.addOffer);
router.get("/all/:id", offerController.getAllOffers);

module.exports = router;
