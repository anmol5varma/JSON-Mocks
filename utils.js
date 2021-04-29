const path = require('path');
const fs = require('fs');

const { MOCK_FILE_PATH } = require('./constants/config');

const promisifyReadDir = (pathValue) => new Promise((resolve, reject) => {
  fs.readdir(path.join(__dirname, pathValue), (err, files) => {
    if (err) {
      reject(err);
    } else {
      resolve(files);
    }
  });
});

const promisifyReadFile = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(path.join(__dirname, filePath), 'utf-8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

const getFilePathRecursively = async (directory) => {
  const filesInDirectory = await promisifyReadDir(directory);
  const promisifiedPathArray = filesInDirectory.map(async (file) => {
    const absolute = path.join(directory, file);
    if (fs.statSync(path.join(__dirname, absolute)).isDirectory()) {
      const dirList = await getFilePathRecursively(absolute);
      return dirList;
    }
    // return absolute;
    return absolute.replace(MOCK_FILE_PATH, '');
  });
  const list = await Promise.all(promisifiedPathArray);
  return list.flat();
};

module.exports = {
  promisifyReadDir,
  promisifyReadFile,
  getFilePathRecursively,
};
