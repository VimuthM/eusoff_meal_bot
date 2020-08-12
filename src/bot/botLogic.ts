type BotCommandObject = {
  execute: () => void;
  description?: string;
};

type BotCommandDictionary = {
  [name: string]: BotCommandObject;
};

type BotCommand = {
  command: string;
  description: string;
};

const botCommandDictionary: BotCommandDictionary = {
  '/get_breakfast': {
    execute: () =>
      sendMessage(
        "Which day's breakfast would you like to view?",
        breakfastKeyboard
      ),
    description: 'Get breakfast for every day of this current week',
  },
  '/get_dinner': {
    execute: () =>
      sendMessage("Which day's dinner would you like to view?", dinnerKeyboard),
    description: 'Get dinner for every day of this current week',
  },
  '/start': {
    execute: () =>
      sendMessage(
        "Find out what today's breakfast or dinner is!",
        startKeyboard()
      ),
    description: 'Starts the bot, and shows the basic function',
  },
  "Today's Breakfast": {
    execute: () => {
      const breakfast = getBreakfast(getCurrentWeek(), getCurrentDay());
      sendMessage(parseMeal(breakfast));
    },
  },
  "Tomorrow's Breakfast": {
    execute: () => {
      const breakfast = getBreakfast(
        getCurrentWeek(),
        (getCurrentDay() + 1) % 7
      );
      sendMessage(parseMeal(breakfast));
    },
  },
  "Today's Dinner": {
    execute: () => {
      const dinner = getDinner(getCurrentWeek(), getCurrentDay());
      sendMessage(parseMeal(dinner));
    },
  },
  "Tomorrow's Dinner": {
    execute: () => {
      const dinner = getDinner(getCurrentWeek(), (getCurrentDay() + 1) % 7);
      sendMessage(parseMeal(dinner));
    },
  },
  default: {
    execute: () => sendMessage('Invalid request! Please press /start'),
  },
};

const botCommands: BotCommand[] = Object.keys(botCommandDictionary)
  .filter((key) => key.startsWith('/'))
  .map((key) => ({
    command: key.substring(1),
    description: botCommandDictionary[key].description || '',
  }))
