function doPost(e) {
  // for further security, only accept requests from those who know the bot token
  const contents = JSON.parse(e.postData.contents);
  let chatId, text;

  if (contents.callback_query) {
    chatId = contents.callback_query.message.chat.id;
    text = contents.callback_query.data;
    sendMessage(chatId, 'test');
    parseMessage(chatId, text);
  } else {
    chatId = contents.message.chat.id;
    text = contents.message.text;
    sendMessage(chatId, 'test');
    parseMessage(chatId, text);
  }
}

function doGet(e) {
  deleteWebHook();
  const response = setWebHook();
  if (response.getResponseCode() !== 200) {
    return HtmlService.createHtmlOutput('<p>webhook not set :(</p>');
  }
  return HtmlService.createHtmlOutput('<p>webhook set!</p>');
}

// Get current week
function getCurrentWeek() {
  const currentDate = new Date();
  const numberOfDays = Math.floor(
    (currentDate.getTime() - START_DATE.getTime()) / SECONDS_IN_DAY
  );
  const currentWeek = (Math.floor(numberOfDays / 7) % 4) + 1;
  return currentWeek;
}

// Function to send message chat
// Optional inline keyboard
// returns void
function sendMessage(chatId: number, text: string, replyMarkup?: ReplyMarkup) {
  const sendMessageData: SendMessageData = {
    chat_id: chatId,
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
}

// Parses messages and sends the processed output to sendMessage
// returns void
function parseMessage(chatId: number, text: string) {
  if (text[0] === '/') {
    switch (text) {
      case '/get_meals':
      case '/get_meals@EusoffMealBot':
        sendMessage(
          chatId,
          'Would you like to view Breakfast or Dinner?',
          mealKeyboard
        );
        break;

      case '/get_breakfast':
      case '/get_breakfast@EusoffMealBot':
        sendMessage(
          chatId,
          "Which day's breakfast would you like to view?",
          breakfastKeyboard
        );
        break;

      case '/get_dinner':
      case '/get_dinner@EusoffMealBot':
        sendMessage(
          chatId,
          "Which day's dinner would you like to view?",
          dinnerKeyboard
        );
        break;
    }
  } else if (text[0] === '>') {
    const dayNo = text[2];
    if (text[1] === 'B') {
      const breakfast = getBreakfast(getCurrentWeek(), parseInt(dayNo));
      sendMessage(chatId, breakfast ? parseMeal(breakfast) : 'ERROR');
    } else if (text[1] === 'D') {
      const dinner = getDinner(getCurrentWeek(), parseInt(dayNo));
      sendMessage(chatId, parseMeal(dinner));
    } else {
      sendMessage(chatId, 'Invalid request');
    }
  }
}

// Creates the nicely formatted string from the Meal objects
// returns String
const parseMeal = (meal: { [x: string]: string }): string => {
  return Object.keys(meal)
    .map((currentKey) => `<b>${currentKey}</b> - ${meal[currentKey]}`)
    .reduce((output, currentMeal) => output + '\n' + currentMeal);
};

// Gets details of breakfast from the main sheets
// returns Breakfast object
const getBreakfast = (week: number, day: number) => {
  const sheet = SpreadsheetApp.openById(breakfastMenuSheetId).getSheetByName(
    `Week ${week}`
  );
  const column = String.fromCharCode('B'.charCodeAt(0) + day);
  const breakfastData = sheet
    .getRange(`${column}2:${column}14`)
    .getValues()
    .map((row) => String(row[0]).trim());

  return generateBreakfast(breakfastData);
};

// Gets details of dinner from the main sheets
// returns Breakfast object
const getDinner = (week: number, day: number) => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    `Week ${week}`
  );
  const column = String.fromCharCode('B'.charCodeAt(0) + day);
  const dinnerData = sheet
    .getRange(`${column}2:${column}12`)
    .getValues()
    .map((row) => String(row[0]).trim());

  if (isSpecialDinner(day)) {
    return generateSpecialDinner(dinnerData);
  }
  return generateDinner(dinnerData);
};
