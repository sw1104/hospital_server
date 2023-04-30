const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const patientsRouter = require('./patients');

router.use('/user', userRouter.router);
router.use('/patients', patientsRouter.router);

module.exports = router;
