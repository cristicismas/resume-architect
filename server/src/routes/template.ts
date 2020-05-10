import { Request, ResponseToolkit } from 'hapi';
import { getTemplatePreviewsLinks, getSinglePreviewLink } from '../handlers/template';

const templateLinksRoute = {
  method: 'GET',
  path: '/templates/previews/{indexToFetch}',
  handler: (request: Request, res: ResponseToolkit) => getTemplatePreviewsLinks(request, res)
};

const singleTemplateLinkRoute = {
  method: 'GET',
  path: '/templates/single_preview/{templateName}',
  handler: (request: Request, res: ResponseToolkit) => getSinglePreviewLink(request, res)
};

export default [templateLinksRoute, singleTemplateLinkRoute];
