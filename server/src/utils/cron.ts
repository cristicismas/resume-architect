import cron from 'node-cron';
import { buildTemplatePreviews, fetchAndStorePreviewLinks } from '../utils/templates';
import { fetchAndStoreResumeLinks } from '../utils/resume';

export const runCronJobs = async () => {
  await buildTemplatePreviews();
  await fetchAndStorePreviewLinks();
  await fetchAndStoreResumeLinks();

  everyThirtyMinutes(buildTemplatePreviews);
  everyThirtyMinutes(fetchAndStorePreviewLinks);
  everyThirtyMinutes(fetchAndStoreResumeLinks);
};

const everyThirtyMinutes = (callback: () => void) => {
  cron.schedule('*/30 * * * *', callback);
};
