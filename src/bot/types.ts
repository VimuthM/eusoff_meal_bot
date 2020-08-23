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
  keyboard: KeyboardButton[][];
  one_time_keyboard?: boolean;
  selective?: boolean;
};
