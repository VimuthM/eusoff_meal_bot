const setWebHook = () =>
  UrlFetchApp.fetch(
    telegramUrl + '/setWebHook?url=' + webHookLink + '?=' + botToken
  );

const getWebHook = () => UrlFetchApp.fetch(telegramUrl + '/getWebHookInfo');

const deleteWebHook = () => UrlFetchApp.fetch(telegramUrl + '/deleteWebHook');

const sendMessage = (text: string, replyMarkup?: ReplyMarkup) => {
  const sendMessageData: SendMessageData = {
    chat_id: 260328088,
    text,
    reply_markup: replyMarkup,
    parse_mode: 'HTML',
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(sendMessageData),
  } as GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

  UrlFetchApp.fetch(telegramUrl + '/sendMessage', options);
};

const setBotCommands = () => {
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(botCommands),
  } as GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;
  return UrlFetchApp.fetch(telegramUrl + '/setMyCommands', options);
};

const getBotCommands = () => UrlFetchApp.fetch(telegramUrl + '/getMyCommands');
