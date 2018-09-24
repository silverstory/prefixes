const express = require('express');
const router = express.Router();
const passport = require('passport');
const appService = require('../services/app.service');

// FIND
router.get('/app/:text', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
  appService.findApp(req, res, next);
});

// GET by App name
router.get('/app/c/:appname', async (req, res, next) => {
  appService.findAppByAppName(req, res, next);
});

// GET by ID
router.get('/app/get/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
  appService.getApp(req, res, next);
});

// POST
router.post('/app', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
  appService.postApp(req, res, next);
});

// PUT
router.put('/app/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
  appService.putApp(req, res, next);
});

// DELETE by ID
router.delete('/app/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
  appService.deleteAppById(req, res, next);
});

// DELETE by App Name
router.delete('/app/delete/:appname', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
  appService.deleteAppByAppName(req, res, next);
});

// Generate App Auth Token by ID
router.get('/app/gen/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
  appService.generateAppAuthToken(req, res, next);
});

module.exports = router;
