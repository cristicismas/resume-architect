import { Request } from 'hapi';
import { getTemplatePreviewsLinks, getSinglePreviewLink } from '../handlers/template';

const templateLinksRoute = {
  method: 'GET',
  path: '/templates/previews/{indexToFetch}',
  handler: (request: Request) => getTemplatePreviewsLinks(request)
};

const singleTemplateLinkRoute = {
  method: 'GET',
  path: '/templates/single_preview/{templateName}',
  handler: (request: Request) => getSinglePreviewLink(request)
};

export default [templateLinksRoute, singleTemplateLinkRoute];
