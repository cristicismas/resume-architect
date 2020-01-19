import * as cron from 'node-cron';

export const everyFifteenMinutes = (callback: Function) => {
  cron.schedule('*/15 * * * *', callback);
};

export const everyTenMinutes = (callback: Function) => {
  cron.schedule('*/10 * * * *', callback);
};
