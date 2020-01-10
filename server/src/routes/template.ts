import { getTemplateLinks } from '../handlers/template';

const templateLinksRoute = {
  method: 'GET',
  path: '/templates/previews',
  handler: () => getTemplateLinks()
};

export default [templateLinksRoute];
