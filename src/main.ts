let chat: any;
function doPost(e: GoogleAppsScript.Events.DoPost) {
  // for further security, only accept requests from those who know the bot token
  const contents = JSON.parse(e.postData.contents);
  if (contents.callback_query) {
    chat = contents.callback_query.message.chat;
    parseCallbackQuery(contents.callback_query.data);
    answerCallbackQuery(contents.callback_query.id);
    return;
  }
  chat = contents.message.chat;
  parseMessage(contents.message.text);
}

function doGet(e: GoogleAppsScript.Events.DoGet) {
  deleteWebHook();
  const webHookResponse = setWebHook();
  const botCommandResponse = setBotCommands();
  const currentOutput = HtmlService.createHtmlOutput('<p>start</p>');
  const botCommands = getBotCommands();
  currentOutput.append(webHookResponse.getContentText());
  currentOutput.append(botCommandResponse.getContentText());
  currentOutput.append('<p>' + botCommands.getContentText() + '</p>');
  return currentOutput;
}

// Function to send message chat
// Optional inline keyboard
// returns void

// Parses messages and sends the processed output to sendMessage
// returns void
function parseMessage(text: string) {
  const endOfCommand = text.indexOf(botName);
  const commandName = endOfCommand < 0 ? text : text.substring(0, endOfCommand);
  const command = botCommandDictionary[commandName];
  try {
    command ? command.execute() : botCommandDictionary.default.execute();
  } catch (error) {
    sendMessage(
      'Sorry a bug occured! Please contact Hackers @athuyaoo and tell them about this!'
    );
  }
}

const parseCallbackQuery = (callbackData: string) => {
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
  return Object.entries(meal)
    .map((entries) => `<b>${entries[0]}</b> - ${entries[1]}`)
    .reduce((output, currentMeal) => output + '\n' + currentMeal);
};

// Gets details of breakfast from the main sheets
// returns Breakfast object
const getBreakfast = (week: number, day: number) => {
  const sheet = SpreadsheetApp.openById(breakfastMenuSheetId).getSheetByName(
    `Week ${week}`
  );
  if (!sheet) return;

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
  const sheet = SpreadsheetApp.openById(dinnerMenuSheetId).getSheetByName(
    `Week ${week}`
  );
  if (!sheet) return;

  const column = String.fromCharCode('B'.charCodeAt(0) + day);
  const dinnerData = sheet
    ?.getRange(`${column}2:${column}12`)
    .getValues()
    .map((row) => String(row[0]).trim());

  if (isSpecialDinner(day)) {
    return generateSpecialDinner(dinnerData);
  }
  return generateDinner(dinnerData);
};
