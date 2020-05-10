import { Request, ResponseToolkit } from 'hapi';
import { ITemplatePreview } from '../interfaces/template';
import { readJSON } from '../utils/files';
import Boom from '@hapi/boom';

const max_results = 6;

export const getTemplatePreviewsLinks = async (request: Request, res: ResponseToolkit) => {
  try {
    const { indexToFetch } = request.params;

    let templateLinks = await readJSON('template_previews.json');

    if (indexToFetch + max_results > templateLinks.length) {
      templateLinks = templateLinks.slice(indexToFetch, templateLinks.length);
    } else {
      templateLinks = templateLinks.slice(indexToFetch, indexToFetch + max_results);
    }

    return res.response(templateLinks);
  } catch (err) {
    console.log(err);
    return Boom.badImplementation('Something went wrong getting the template preview links');
  }
};

export const getSinglePreviewLink = async (request: Request, res: ResponseToolkit) => {
  try {
    const { templateName } = request.params;

    const templateLinks = await readJSON('template_previews.json');

    const template = templateLinks.find((template: ITemplatePreview) => {
      if (template.name === templateName) return true;
    });

    return res.response(template);
  } catch (err) {
    console.log(err);
    return Boom.badImplementation('Something went wrong getting the preview link');
  }
};
