const express = require('express');
const router = express.Router();
const passport = require('passport');
const qrcode = require('../services/qrcode');

// Create QR Code Image
// POST http://localhost:3000/api/qr
router.post('/qr', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
  try {
    const data = req.body;
    const url = await qrcode.createQRx64Image(data.url);
    return await res.send(url);
  }
  catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error ); 
  }
});

// Create Downloadable QR Code Image
// POST http://localhost:3000/api/qrdl
router.post('/qrdl', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
  try {
    const data = req.body;
    const url = await qrcode.createDownloadableQR(data.url);
    return await res.send(url);
  }
  catch (error) {
    console.log("Error: " + error);
    return await res.send( "Error: " + error ); 
  }
});

module.exports = router;