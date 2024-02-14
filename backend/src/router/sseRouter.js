//pingRouter
const express = require("express");
const router = express.Router();
const sseController = require("../controllers/sseController");

router.get("/", sseController.sseController);

module.exports = router;