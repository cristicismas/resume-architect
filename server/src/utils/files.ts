import fs from 'fs-extra';
import path from 'path';
import request from 'request';
import rootDir from '../constants/rootDir';

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
  return fs.unlink(path.join(rootDir, localPath));
};

export const writeStreamFromURL = (url: string, localPath: string) => {
  return new Promise((resolve, reject) => {
    const writeStream = request(url).pipe(fs.createWriteStream(path.join(rootDir, localPath)));

    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
};

export const writeToTemp = async (filename: string, content: ArrayBuffer) => {
  return fs.writeFile(path.join(rootDir, `temp/${filename}`), content);
};
