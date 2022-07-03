const auctionController = require("../controllers/AuctionController");

const express = require("express");
const router = express.Router();

router.get("/", auctionController.getAllAuctions);
router.post("/", auctionController.addAuction);
router.get("/closed", auctionController.getAllClosedAuctions);
router.get("/not/closed", auctionController.getAllNotClosedAuctions);
router.get("/:id", auctionController.getOneAuction);
module.exports = router;
