const express = require('express');
const config = require('dotenv');
const path = require('path');
const morgan = require('morgan');

const { getFilePathRecursively, promisifyReadFile } = require('./utils');
const { DEFAULT_PORT, MOCK_FILE_PATH } = require('./constants/config');

config.config();

const app = express();
app.use(morgan('short'));

const port = process.env.PORT || DEFAULT_PORT;

const init = async () => {
  const files = await getFilePathRecursively(MOCK_FILE_PATH);
  files.forEach((file) => {
    let prefix = process.env.SERVICE_NAME ? `/${process.env.SERVICE_NAME}` : '';

    const pathAndFilename = path.basename(file, '.json');
    let filePath = path.dirname(file);
    filePath = filePath === '/' ? '' : filePath;
    prefix += filePath;

    let [method, filename] = pathAndFilename.split(':');
    if (filename === undefined) {
      filename = method;
      method = 'get';
    }

    method = method.toLowerCase();
    const routePath = `${prefix}/${filename}`;
    console.log('\x1b[33m', 'Adding route: ', method.toUpperCase(), routePath);

    app[method](routePath, async (req, res) => {
      const fileData = await promisifyReadFile(`${MOCK_FILE_PATH}/${file}`);
      res.json(JSON.parse(fileData));
    });
  });
};

(async () => {
  await init();
  app.listen(port, () => {
    console.log('\x1b[32m', `Server is running on PORT ${port}`);
  });
})();
