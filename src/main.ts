let currentUpdate, chat;
function doPost(e) {
  // for further security, only accept requests from those who know the bot token
  const contents = JSON.parse(e.postData.contents);
  currentUpdate = contents;
  chat = contents.message.chat;
  sendMessage(contents);
  if (contents.callback_query) {
    parseCallbackQuery(contents.callback_query.data);
  }
  parseMessage(contents.message.text);
}

function doGet(e) {
  deleteWebHook();
  const webHookResponse = setWebHook();
  const botCommandResponse = setBotCommands();
  const currentOutput = HtmlService.createHtmlOutput('<p>start</p>');
  currentOutput.append(
    webHookResponse.getResponseCode() === 200
      ? getWebHook().getContentText()
      : webHookResponse.getContentText()
  );
  currentOutput.append(
    botCommandResponse.getResponseCode() === 200
      ? botCommandResponse.getContentText()
      : botCommandResponse.getContentText()
  );
  currentOutput.append(
    '<p>' + botCommands.map((command) => JSON.stringify(command)) + '</p>'
  );
  return currentOutput;
}

// Function to send message chat
// Optional inline keyboard
// returns void

// Parses messages and sends the processed output to sendMessage
// returns void
function parseMessage(text: string) {
  sendMessage('AABB');
  const endOfCommand = text.indexOf(botName);
  const commandName = endOfCommand < 0 ? text : text.substring(0, endOfCommand);
  const command = botCommandDictionary[commandName];
  command ? command.execute() : botCommandDictionary.default.execute();
}

const parseCallbackQuery = (callbackData: string) => {
  sendMessage('AAA');
  if (callbackData[0] !== '>') return;
  const dayNo = callbackData[2];
  if (callbackData[1] === 'B') {
    const breakfast = getBreakfast(getCurrentWeek(), parseInt(dayNo));
    sendMessage(parseMeal(breakfast));
  } else if (callbackData[1] === 'D') {
    const dinner = getDinner(getCurrentWeek(), parseInt(dayNo));
    sendMessage(parseMeal(dinner));
  } else {
    sendMessage('Invalid request');
  }
};

// Creates the nicely formatted string from the Meal objects
// returns String
const parseMeal = (
  meal?: BreakfastObject | DinnerObject | SpecialDinnerObject
): string => {
  if (!meal) return 'ERROR';
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
