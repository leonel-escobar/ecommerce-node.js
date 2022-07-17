const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController")

require("dotenv").config()

router.post("/enviar", orderController.sendOrder)

module.exports = router;