const express = require('express');
const security = require('./security');
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
// const config = require("./config/config.js");
require('./mongo').connect();

const root = '../dist/';

const app = express();
const port = process.env.PORT || 3000;
const publicweb = process.env.PUBLICWEB || '../dist/publicweb';

// cors middleware
app.use(cors());

//body-parser
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// ng azure security way
app.use(security());

// don't really need this code anymore... but just keep it anyway.
// app.use(csrf({ cookie: true }));

// serve publicweb folder
app.use(express.static(path.join(root, 'publicweb')));

// users routes
const users = require("./routes/users");
app.use('/users', users);

// other routes go here
// const heroes_routes = require('./routes/heroes');
const heroes = require('./routes/heroes');
app.use('/api', heroes);
const profiles = require('./routes/profiles');
app.use('/api', profiles);
const qrcode = require('./routes/qrcode');
app.use('/api', qrcode);
const profile2fa = require('./routes/profile2fa');
app.use('/api', profile2fa);
const ipwhitelist = require('./routes/ipwhitelist');
app.use('/api', ipwhitelist);
const prefix = require('./routes/prefix');
app.use('/api', prefix);
const opapp = require('./routes/app');
app.use('/api', opapp);
const smsdeliverylog = require('./routes/smsdeliverylog');
app.use('/api', smsdeliverylog);
const sms = require('./routes/sms');
app.use('/api', sms);

// try to implement this line if it'll solve resource not found if :3000/{path}
// app.get('*', (req, res) => {
//     res.sendFile('index.html', {root: root});
// });

app.get('*', (req, res) => {
    res.sendFile(`index.html`, { root: publicweb });
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
