const mealKeyboard = new InlineKeyboard([
  [new InlineKeyboardButton('Breakfast', '/getbreakfast')],
  [new InlineKeyboardButton('Dinner', '/getdinner')]
])

const dinnerKeyboard = new InlineKeyboard([
  [new InlineKeyboardButton('Monday', '>D1Monday')],
  [new InlineKeyboardButton('Tuesday', '>D2Tuesday')],
  [new InlineKeyboardButton('Wednesday', '>D3Wednesday')],
  [new InlineKeyboardButton('Thursday', '>D4Thursday')],
  [new InlineKeyboardButton('Friday', '>D5Friday')],
  [new InlineKeyboardButton('Sunday', '>D6Sunday')]
])

const breakfastKeyboard = new InlineKeyboard([
  [new InlineKeyboardButton('Monday', '>B1Monday')],
  [new InlineKeyboardButton('Tuesday', '>B2Tuesday')],
  [new InlineKeyboardButton('Wednesday', '>B3Wednesday')],
  [new InlineKeyboardButton('Thursday', '>B4Thursday')],
  [new InlineKeyboardButton('Friday', '>B5Friday')],
  [new InlineKeyboardButton('Saturday', '>B6Saturday')]
])
