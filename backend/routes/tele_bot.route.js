var express = require('express');
var router = express.Router();
var {URI} = require('../tele_api');

var TeleController = require('../controllers/tele_bot.controller')

router.post(URI, TeleController.TeleController);

module.exports = router;