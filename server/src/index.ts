import { Server } from '@hapi/hapi';
import dotenv from 'dotenv';

import connectToDatabase from './models/index';
import configureCloudinary from './utils/cloudinary';

import { configureJWT } from './plugins/jwt';
import routes from './routes/index';

import { buildTemplatePreviews, fetchAndStorePreviewLinks } from './utils/templates';
import { fetchAndStoreResumeLinks } from './utils/resume';

const init = async () => {
  dotenv.config();

  const server: Server = new Server({
    port: 8000,
    host: 'localhost',
    routes: {
      cors: {
        origin: process.env.CORS_WHITELIST.split(', ')
      }
    }
  });

  await configureJWT(server);

  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);

  await connectToDatabase();
  console.log('Connected to MongoDB');

  await configureCloudinary();
  console.log('Connected to Cloudinary');

  await buildTemplatePreviews();
  await fetchAndStorePreviewLinks();
  await fetchAndStoreResumeLinks();
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
