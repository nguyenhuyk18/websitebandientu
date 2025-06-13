const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/client/HomeController')

router.get('/', HomeController.index);

module.exports = router;