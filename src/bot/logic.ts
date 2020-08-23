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
      const currentDay = getCurrentDay();
      if (currentDay === 7) {
        return sendMessage('No breakfast on Sundays!');
      }
      const breakfast = getBreakfast(getCurrentWeek(), currentDay);
      sendMessage(
        `Breakfast on ${generateDateString(new Date())}\n\n${parseMeal(
          breakfast
        )}`
      );
    },
  },
  "Tomorrow's Breakfast": {
    execute: () => {
      const dayTomorrow = (getCurrentDay() + 1) % 7;
      const breakfast = getBreakfast(
        getCurrentWeek() + (dayTomorrow === 0 ? 1 : 0),
        dayTomorrow
      );
      const tomorrowDate = new Date();
      tomorrowDate.setDate(tomorrowDate.getDate() + 1);
      sendMessage(
        `Breakfast on ${generateDateString(tomorrowDate)}\n\n${parseMeal(
          breakfast
        )}`
      );
    },
  },
  "Today's Dinner": {
    execute: () => {
      const currentDay = getCurrentDay();
      const dinner = getDinner(getCurrentWeek(), getDinnerColumn(currentDay));
      sendMessage(
        `Dinner on ${generateDateString(new Date())}\n\n${parseMeal(dinner)}`
      );
    },
  },
  "Tomorrow's Dinner": {
    execute: () => {
      const dayTomorrow = (getCurrentDay() + 1) % 7;
      const dinner = getDinner(
        getCurrentWeek() + (dayTomorrow === 0 ? 1 : 0),
        dayTomorrow
      );
      const tomorrowDate = new Date();
      tomorrowDate.setDate(tomorrowDate.getDate() + 1);
      sendMessage(
        `Dinner on ${generateDateString(tomorrowDate)}\n\n${parseMeal(dinner)}`
      );
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
  }));
