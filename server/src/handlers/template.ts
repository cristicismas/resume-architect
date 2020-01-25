import { Request } from 'hapi';
import { ITemplatePreview } from '../interfaces/template';
import * as fs from 'fs';

const max_results = 6;

export const getTemplatePreviewsLinks = async (request: Request) => {
  return new Promise((resolve, reject) => {
    fs.readFile('template_previews.json', 'UTF8', (err, content) => {
      if (err) reject(err);
      else {
        const { indexToFetch } = request.params;

        let templateLinks = JSON.parse(content);

        if (indexToFetch + max_results > templateLinks.length) {
          templateLinks = templateLinks.slice(indexToFetch, templateLinks.length);
        } else {
          templateLinks = templateLinks.slice(indexToFetch, indexToFetch + max_results);
        }

        resolve(templateLinks);
      }
    });
  });
};

export const getSinglePreviewLink = async (request: Request) => {
  return new Promise((resolve, reject) => {
    fs.readFile('template_previews.json', 'UTF8', (err, content) => {
      if (err) reject(err);
      else {
        const { templateName } = request.params;

        let templateLinks = JSON.parse(content);

        const template = templateLinks.find((template: ITemplatePreview) => {
          if (template.name === templateName) return true;
        });

        resolve(template);
      }
    });
  });
};
