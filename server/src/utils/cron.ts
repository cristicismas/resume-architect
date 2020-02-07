import * as cron from 'node-cron';
import { buildTemplatePreviews, fetchAndStorePreviewLinks } from '../utils/templates';
import { fetchAndStoreResumeLinks } from '../utils/resume';

export const runCronJobs = async () => {
  buildTemplatePreviews();
  fetchAndStorePreviewLinks();
  fetchAndStoreResumeLinks();

  everyThirtyMinutes(buildTemplatePreviews);
  everyThirtyMinutes(fetchAndStorePreviewLinks);
  everyThirtyMinutes(fetchAndStoreResumeLinks);
};

const everyThirtyMinutes = (callback: Function) => {
  cron.schedule('*/30 * * * *', callback);
};
