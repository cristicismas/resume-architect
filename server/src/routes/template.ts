import { Request } from 'hapi';
import { getTemplatePreviewsLinks } from '../handlers/template';

const templateLinksRoute = {
  method: 'GET',
  path: '/templates/previews/{indexToFetch}',
  handler: (request: Request) => getTemplatePreviewsLinks(request)
};

export default [templateLinksRoute];
