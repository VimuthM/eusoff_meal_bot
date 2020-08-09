// Edit your Ids here
const botToken = '1115397540:AAHagR3oMvHCJfRGS0t24t5qf5_Ftslmmt0';
const deploymentId =
  'AKfycbzawTgt8I4Uamfg5gGN0N1qtYuJfk6TEQaJOMaM0gbXDv9veelt3cZjY-eao8i7Tz3N';
const breakfastMenuSheetId = '1ICEDGrrlGP9FAldnirTGba6JRg0qZ0VJVa_7nN32gsI';
const dinnerMenuSheetId = '1bE4zi9LHjq1lSf9exWPe9O8wLitCyW_jS0UQSy6t2PU';
const firstMonday = '2020-08-03'; // date of first monday when meals are served

// constants
const START_DATE = new Date(firstMonday);
const SECONDS_IN_DAY = 1000 * 3600 * 24;

// Run function setWebHook
const telegramUrl = 'https://api.telegram.org/bot' + botToken;
const webHookLink =
  `https://script.google.com/macros/s/${deploymentId}/exec?bot=${botToken}`;

function setWebHook() {
  return UrlFetchApp.fetch(
    telegramUrl + '/setWebHook?url=' + webHookLink + '?=' + botToken
  );
}

function deleteWebHook() {
  UrlFetchApp.fetch(telegramUrl + '/deleteWebHook');
}
