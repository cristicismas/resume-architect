import { Request } from 'hapi';
import { ITemplatePreview } from '../interfaces/template';
import fs from 'fs-extra';
import Boom from '@hapi/boom';

const max_results = 6;

export const getTemplatePreviewsLinks = async (request: Request) => {
  try {
    const linksFile = await fs.readFile('template_previews.json', 'UTF8');
    const { indexToFetch } = request.params;

    let templateLinks = JSON.parse(linksFile);

    if (indexToFetch + max_results > templateLinks.length) {
      templateLinks = templateLinks.slice(indexToFetch, templateLinks.length);
    } else {
      templateLinks = templateLinks.slice(indexToFetch, indexToFetch + max_results);
    }

    return templateLinks;
  } catch (err) {
    console.log(err);
    return Boom.badImplementation('Something went wrong getting the template preview links');
  }
};

export const getSinglePreviewLink = async (request: Request) => {
  try {
    const linksFile = await fs.readFile('template_previews.json', 'UTF8');
    const { templateName } = request.params;

    let templateLinks = JSON.parse(linksFile);

    const template = templateLinks.find((template: ITemplatePreview) => {
      if (template.name === templateName) return true;
    });

    return template;
  } catch (err) {
    console.log(err);
    return Boom.badImplementation('Something went wrong getting the preview link');
  }
};
