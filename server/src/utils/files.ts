import fs from 'fs-extra';
import path from 'path';
import request from 'request';
import CONSTANTS from '../constants';

export const getTempFileName = (suffix: string) => {
  const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));

  let fileName = 'temp/' + getRandomInt(100000) + suffix;

  while (fs.existsSync(fileName)) {
    fileName = 'temp/' + getRandomInt(100000) + suffix;
  }

  return fileName;
};

export const readJSON = async (localPath: string) => {
  const fileContent = await fs.readFile(localPath, 'UTF8');
  return JSON.parse(fileContent);
};

export const removeFile = async (localPath: string) => {
  return fs.unlink(path.join(CONSTANTS.rootDir, localPath));
};

export const writeStreamFromURL = (url: string, localPath: string) => {
  return new Promise((resolve, reject) => {
    const writeStream = request(url).pipe(fs.createWriteStream(path.join(CONSTANTS.rootDir, localPath)));

    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
};

export const writeToTemp = async (filename: string, content: ArrayBuffer) => {
  return fs.writeFile(path.join(CONSTANTS.rootDir, `temp/${filename}`), content);
};
