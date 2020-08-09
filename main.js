// Function to process incoming webhook post requests
// Distinguishes between callback query and messages
// returns void
function doPost (e) {
  // for further security, only accept requests from those who know the bot token
  if (e.parameter.bot !== botToken) return
  const contents = JSON.parse(e.postData.contents)
  let chatId, text

  if (contents.callback_query) {
    chatId = contents.callback_query.message.chat.id
    text = contents.callback_query.data
    parseMessage(chatId, text)
  } else {
    chatId = contents.message.chat.id
    text = contents.message.text
    parseMessage(chatId, text)
  }
}

function doGet (e) {
  deleteWebHook()
  const response = setWebHook()
  if (response.getResponseCode() !== 200) { return HtmlService.createHtmlOutput('<p>webhook not set :(</p>') }
  return HtmlService.createHtmlOutput('<p>webhook set!</p>')
}

// Get current week
function getCurrentWeek () {
  const currentDay = new Date()
  const numberOfDays = Math.floor(
    (currentDay.getTime() - START_DATE.getTime()) / SECONDS_IN_DAY
  )
}

// Function to send message chat
// Optional inline keyboard
// returns void
function sendMessage (chatId, message, keyboard = null) {
  let data

  if (keyboard == null) {
    data = new Message(chatId, message)
  } else {
    data = new Message(chatId, message, keyboard)
  }

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(data)
  }

  UrlFetchApp.fetch(telegramUrl + '/sendMessage', options)
}

// Parses messages and sends the processed output to sendMessage
// returns void
function parseMessage (chatId, text) {
  if (text[0] === '/') {
    switch (text) {
      case '/get_meals':
      case '/get_meals@EusoffMealBot':
        sendMessage(
          chatId,
          'Would you like to view Breakfast or Dinner?',
          mealKeyboard
        )
        break

      case '/get_breakfast':
      case '/get_breakfast@EusoffMealBot':
        sendMessage(
          chatId,
          "Which day's breakfast would you like to view?",
          breakfastKeyboard
        )
        break

      case '/get_dinner':
      case '/get_dinner@EusoffMealBot':
        sendMessage(
          chatId,
          "Which day's dinner would you like to view?",
          dinnerKeyboard
        )
        break
    }
  } else if (text[0] === '>') {
    const dayNo = text[2]
    if (text[1] === 'B') {
      const breakfast = getBreakfast(
        parseInt(Utilities.formatDate(new Date(), 'GMT+08', 'w')),
        parseInt(dayNo)
      )
      sendMessage(chatId, parseMeal(breakfast))
    } else if (text[1] === 'D') {
      const dinner = getDinner(
        parseInt(Utilities.formatDate(new Date(), 'GMT+08', 'w')),
        parseInt(dayNo)
      )
      sendMessage(chatId, parseMeal(dinner))
    } else {
      sendMessage(chatId, 'Invalid request')
    }
  }
}

// Creates the nicely formatted string from the Meal objects
// returns String
function parseMeal (meal) {
  let outputString = ''
  for (var key of Object.keys(meal)) {
    outputString += '<b>' + key + '</b>\n'
    if (Array.isArray(meal[key])) {
      meal[key].forEach((element) => {
        outputString += element[0] + '\n'
      })
    } else {
      outputString += meal[key] + '\n'
    }
    outputString += '\n'
  }
  return outputString
}

// Gets details of breakfast from the main sheets
// returns Breakfast object
function getBreakfast (week, day) {
  const sheet = SpreadsheetApp.openById(breakfastMenuSheetId).getSheetByName(
    week + 'B'
  )
  const column = String.fromCharCode('B'.charCodeAt(0) + day)
  return new Breakfast(
    sheet.getRange(column + '2:' + column + '4').getValues(),
    sheet.getRange(column + '5').getValue(),
    sheet.getRange(column + '6').getValue(),
    sheet.getRange(column + '7:' + column + '9').getValues(),
    sheet.getRange(column + '10').getValue(),
    sheet.getRange(column + '11').getValue(),
    sheet.getRange(column + '12').getValue(),
    sheet.getRange(column + '13').getValue(),
    sheet.getRange(column + '14').getValue()
  ).get()
}

// Gets details of dinner from the main sheets
// returns Breakfast object
function getDinner (week, day) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    week + 'D'
  )
  const column = String.fromCharCode('B'.charCodeAt(0) + day)
  if (day % 2 === 0) {
    return new SpecialDinner(
      sheet.getRange(column + '2').getValue(),
      sheet.getRange(column + '7').getValue(),
      sheet.getRange(column + '11').getValue(),
      sheet.getRange(column + '12').getValue()
    ).get()
  } else {
    return new Dinner(
      sheet.getRange(column + '2').getValue(),
      sheet.getRange(column + '3').getValue(),
      sheet.getRange(column + '4').getValue(),
      sheet.getRange(column + '5').getValue(),
      sheet.getRange(column + '6:' + column + '8').getValues(),
      sheet.getRange(column + '9').getValue(),
      sheet.getRange(column + '10').getValue(),
      sheet.getRange(column + '11').getValue(),
      sheet.getRange(column + '12').getValue()
    ).get()
  }
}
