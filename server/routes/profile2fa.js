const express = require('express');
const router = express.Router();
const passport = require('passport');
const profile2faService = require('../services/profile2fa.service');

// Prove Identity
// POST http://localhost:3000/api/profile/prove
router.post('/profile/prove', async (req, res, next) => {
  profile2faService.proveIdentity(req, res, next);
});

// Verify Token
// POST http://localhost:3000/api/profile/verify
router.post('/profile/verify', async (req, res, next) => {
  profile2faService.verifyToken(req, res, next);
});

module.exports = router;
