const express = require("express");
const axios = require("axios");
const RouteController = require("../Controllers/RouteController");

const router = express.Router();

router.get("/random", RouteController.getRandomComicStripe);
router.get("/:id", RouteController.getComicsStripe);


module.exports = router;


//https://xkcd.com/614/info.0.json