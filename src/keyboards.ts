const mealKeyboard: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      createInlineButtons('Breakfast', '/get_breakfast'),
      createInlineButtons('Dinner', '/get_dinner'),
    ],
  ],
};

const dinnerKeyboard: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      createInlineButtons('Mon', '>D1'),
      createInlineButtons('Tue', '>D2'),
      createInlineButtons('Wed', '>D3'),
    ],
    [
      createInlineButtons('Thu', '>D4'),
      createInlineButtons('Fri', '>D5'),
      createInlineButtons('Sun', '>D6'),
    ],
  ],
};

const breakfastKeyboard: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      createInlineButtons('Mon', '>B1'),
      createInlineButtons('Tue', '>B2'),
      createInlineButtons('Wed', '>B3'),
    ],
    [
      createInlineButtons('Thu', '>B4'),
      createInlineButtons('Fri', '>B5'),
      createInlineButtons('Sat', '>B6'),
    ],
  ],
};
