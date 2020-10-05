Logger = BetterLog.useSpreadsheet(logger);

const generateBreakfast = (
  breakfastList: string[]
): BreakfastObject | undefined => {
  return {
    'Breads and Cakes': breakfastList.slice(0, 3).join(', '),
    'Continental Delights': breakfastList[3],
    'Oriental Delights': breakfastList[4],
    'Hot Selection': breakfastList
      .slice(5, 7)
      .filter((string) => !!string)
      .join(', '),
    Sides: breakfastList[7],
    Cereal: breakfastList[8],
    'Enriched Bread': breakfastList[9],
    'Daily Specials': breakfastList[10],
    Drinks: breakfastList.slice(11, 13).join(', '),
  };
};

const isSpecialDinner = (day: number) => day % 2 === 1;
const generateDinner = (dinnerList: string[]): DinnerObject | undefined => {
  const dinner = {
    Rice: dinnerList[0],
    Pork: dinnerList[1],
    Chicken: dinnerList[2],
    Seafood: dinnerList[3],
    Sides: dinnerList
      .slice(4, 6)
      .filter((string) => !!string)
      .join(', '),
    Vegetables: dinnerList[6],
    'Soup of the Day': dinnerList[7],
    'Fruit / Dessert': dinnerList[8],
    Drinks: dinnerList[9],
  };
  return dinner;
};

const generateSpecialDinner = (
  dinnerList: string[]
): SpecialDinnerObject | undefined => {
  return {
    'Set A': dinnerList[0],
    'Set B': dinnerList[4],
    'Fruit / Dessert': dinnerList[8],
    Drinks: dinnerList[9],
  };
};

const createInlineButtons = (
  text: string,
  callbackData: string
): InlineKeyboardButton => {
  return {
    text,
    callback_data: callbackData,
  };
};

const createKeyboardButtons = (text: string): KeyboardButton => {
  return { text };
};

// Get current week
function getCurrentWeek() {
  const currentDate = new Date();
  const numberOfDays = Math.floor(
    (currentDate.getTime() - START_DATE.getTime()) / SECONDS_IN_DAY
  );
  const currentWeek = Math.floor(numberOfDays / 7) + 1;
  return currentWeek;
}

// Get current day of the week
const getCurrentDay = () => {
  // getDay() return sunday as 0, monday as 1
  // Want monday as 1, tuesday as 2, ... sunday as 7
  return ((new Date().getDay() + 6) % 7) + 1;
};

const getDinnerColumn = (day: number) => {
  return day === 7 ? day - 1 : day;
};

const generateDateString = (date: Date): string => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-us', options);
};
