const express = require('express');
const config = require('dotenv');
const fs = require('fs');
const path = require('path');

const { DEFAULT_PORT } = require('./constants/config');

config.config();

const app = express();
const port = process.env.PORT || DEFAULT_PORT;

fs.readdir(__dirname + '/mocks', (err, files) => {
  if (err) {
    console.error(err);
  } else {
    files.forEach(file => {
      const prefix = process.env.SERVICE_NAME ? `/${process.env.SERVICE_NAME}` : '';
      const filename = path.basename(file, '.json')

      const routePath = `${prefix}/${filename}`
      console.log('Adding route: ', routePath);
      app.get(routePath, (req, res) => {
        const fileData = fs.readFileSync(__dirname + '/mocks/' + file, { encoding: 'utf8', flag: 'r' });
        res.json(JSON.parse(fileData))
      })
    })
  }
})

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
