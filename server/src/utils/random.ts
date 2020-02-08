import fs from 'fs-extra';

export const getUniqueFileName = (path: string, extension: string) => {
  let fileName = path + getRandomInt(100000) + extension;

  while (fs.existsSync(fileName)) {
    fileName = path + getRandomInt(100000) + extension;
  }

  return fileName;
};

const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));
