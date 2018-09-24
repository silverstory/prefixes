const QRCode = require('qrcode');

const generateQR = async text => {
  try {
    const qr = await QRCode.toDataURL(text);
    return qr;
  } catch (err) {
    console.log(err)
    return null;
  }
}

module.exports.createQRx64Image = async text => {
  try {
    const url = await generateQR(text);
    return url;
  } catch (error) {
    console.log(err)
    return null;
  }
}

module.exports.createDownloadableQR = async text => {
  try {
    const url = await generateQR(text);
    // In the following, the regular expression is defined in replace() and includes the ignore case flag.
    const newurl = await url.replace(/data:image\/png;base64,/i, 'data:application/octet-stream;base64,');
    return newurl;
  } catch (error) {
    console.log(err)
    return null;    
  }
}