import { Request } from 'hapi';
import { getTemplateLinks } from '../handlers/template';

const templateLinksRoute = {
  method: 'GET',
  path: '/templates/previews/{indexToFetch}',
  handler: (request: Request) => getTemplateLinks(request)
};

export default [templateLinksRoute];
