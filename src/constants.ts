// constants
const firstMonday = '2020-08-03'; // date of first monday when meals are served
const START_DATE = new Date(firstMonday);
const SECONDS_IN_DAY = 1000 * 3600 * 24;
const telegramUrl = 'https://api.telegram.org/bot' + botToken;
const webHookLink = `https://script.google.com/macros/s/${deploymentId}/exec?bot=${botToken}`;
