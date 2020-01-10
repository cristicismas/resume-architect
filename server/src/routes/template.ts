import { getTemplateLinks } from '../handlers/template';

const templateLinksRoute = {
  method: 'GET',
  path: '/templates/previews',
  config: {
    auth: false
  },
  handler: () => getTemplateLinks()
};

export default [templateLinksRoute];
