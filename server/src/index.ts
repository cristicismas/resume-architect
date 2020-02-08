import { Server } from '@hapi/hapi';
import dotenv from 'dotenv';

import connectToDatabase from './models/index';
import configureCloudinary from './utils/cloudinary';

import { configureJWT } from './plugins/jwt';
import routes from './routes/index';

import { runCronJobs } from './utils/cron';

const init = async () => {
  dotenv.config();

  const server: Server = new Server({
    port: 8000,
    host: 'localhost',
    routes: {
      cors: true
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

  runCronJobs();
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
