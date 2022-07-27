const app = require('./app');
const fs = require('fs');
const https = require('https');
// const server = require("http").createServer(app);
const dotenv = require('dotenv');
dotenv.config();

const certificate = fs.readFileSync(
  '/etc/letsencrypt/live/goodjobcalendar.com/fullchain.pem',
  'utf8'
);
const privateKey = fs.readFileSync(
  '/etc/letsencrypt/live/goodjobcalendar.com/privkey.pem',
  'utf8'
);

const credentials = {
  cert: certificate,
  key: privateKey,
};

const server = https.createServer(credentials, app);


server.listen(process.env.PORT, () => {
  console.log(
    'Good-job server is running on PORT =',
    process.env.PORT,
    ', ENVIRONMENT =',
    process.env.NODE_ENV
  );
});
