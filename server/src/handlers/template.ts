import * as fs from 'fs';

export const getTemplateLinks = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile('template_links.json', 'UTF8', (err, content) => {
      if (err) reject(err);
      else resolve(JSON.parse(content));
    });
  });
};
