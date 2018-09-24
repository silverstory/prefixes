const express = require('express');
const router = express.Router();
const passport = require('passport');
const smsdeliverylogService = require('../services/smsdeliverylog.service');

// FIND
router.get('/smsdeliverylog/:text', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
  smsdeliverylogService.findSMSDeliveryLog(req, res, next);
});

// GET by ID
router.get('/smsdeliverylog/get/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
  smsdeliverylogService.getSMSDeliveryLog(req, res, next);
});

// POST
router.post('/smsdeliverylog', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
  smsdeliverylogService.postSMSDeliveryLog(req, res, next);
});

// PUT
router.put('/smsdeliverylog/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
  smsdeliverylogService.putSMSDeliveryLog(req, res, next);
});

// DELETE by ID
router.delete('/smsdeliverylog/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
  smsdeliverylogService.deleteSMSDeliveryLogById(req, res, next);
});

module.exports = router;
