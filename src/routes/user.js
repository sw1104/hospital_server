const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/login', userController.userLogin);
router.post('/token', userController.accessTokenReissuance);

module.exports = { router };
