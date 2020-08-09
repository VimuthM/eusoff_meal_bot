type SendMessageData = {
  chat_id: number;
  text: string;
  parse_mode: 'HTML';
  reply_to_message_id?: number;
  reply_markup?: ReplyMarkup;
};

type ReplyMarkup = InlineKeyboardMarkup | ReplyKeyboardMarkup;

type InlineKeyboardButton = {
  text: string;
  callback_data: string;
};

type InlineKeyboardMarkup = {
  inline_keyboard: InlineKeyboardButton[][];
};

type KeyboardButton = {
  text: string;
};

type ReplyKeyboardMarkup = {
  keyboard: KeyboardButton[];
  one_time_keyboard?: boolean;
  selective?: boolean;
};

type BreakfastObject = {
  'Breads and Cakes': string;
  'Continental Delights': string;
  'Oriental Delights': string;
  'Hot Selection': string;
  Sides: string;
  Cereal: string;
  'Enriched Bread': string;
  'Daily Specials': string;
  Drinks: string;
};

type DinnerObject = {
  Rice: string;
  Pork: string;
  Chicken: string;
  Seafood: string;
  Sides: string;
  Vegetables: string;
  'Soup of the Day': string;
  'Fruit / Dessert': string;
  Drinks: string;
};

type SpecialDinnerObject = {
  'Set A': string;
  'Set B': string;
  'Fruit / Dessert': string;
  Drinks: string;
};
