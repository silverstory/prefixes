const express = require('express');
const router = express.Router();
const passport = require('passport');
const prefixService = require('../services/prefix.service');

// FIND
router.get('/prefix/:text', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
  prefixService.findPrefix(req, res, next);
});

// GET by Prefix
router.get('/prefix/c/:prefix', async (req, res, next) => {
  prefixService.findPrefixByPrefix(req, res, next);
});

// GET by ID
router.get('/prefix/get/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
  prefixService.getPrefix(req, res, next);
});

// POST
router.post('/prefix', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
  prefixService.postPrefix(req, res, next);
});

// PUT
router.put('/prefix/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
  prefixService.putPrefix(req, res, next);
});

// DELETE by ID
router.delete('/prefix/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
  prefixService.deletePrefixById(req, res, next);
});

// DELETE by Prefix
router.delete('/prefix/delete/:prefix', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
  prefixService.deletePrefixByPrefix(req, res, next);
});

module.exports = router;
