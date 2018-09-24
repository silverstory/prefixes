const express = require('express');
const router = express.Router();
const passport = require('passport');
const sms8888Service = require('../services/sms8888.service');

router.get('/sms', async (req, res, next) => {
  await sms8888Service.sendSMS(req, res, next);
});

module.exports = router;
