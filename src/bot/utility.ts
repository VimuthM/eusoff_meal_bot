const setWebHook = () => {
  const response = UrlFetchApp.fetch(
    telegramUrl + '/setWebHook?url=' + webHookLink + '&max_connections=30'
  );
  return response;
};

const getWebHook = () => UrlFetchApp.fetch(telegramUrl + '/getWebHookInfo');

const deleteWebHook = () => UrlFetchApp.fetch(telegramUrl + '/deleteWebHook');

const sendMessage = (text: string, replyMarkup?: ReplyMarkup) => {
  const sendMessageData: SendMessageData = {
    chat_id: chat.id,
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
    payload: JSON.stringify({
      commands: botCommands,
    }),
  } as GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;
  return UrlFetchApp.fetch(telegramUrl + '/setMyCommands', options);
};

const getBotCommands = () => UrlFetchApp.fetch(telegramUrl + '/getMyCommands');
const answerCallbackQuery = (callbackQueryId: string) => {
  const answerCallbackQuery: answerCallbackQueryData = {
    callback_query_id: callbackQueryId,
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(answerCallbackQuery),
  } as GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

  UrlFetchApp.fetch(telegramUrl + '/answerCallbackQuery', options);
};
