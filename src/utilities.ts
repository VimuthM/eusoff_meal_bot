const generateBreakfast = (
  breakfastList: string[]
): BreakfastObject | undefined => {
  return {
    'Breads and Cakes': breakfastList.slice(0, 3).join(', '),
    'Continental Delights': breakfastList[3],
    'Oriental Delights': breakfastList[4],
    'Hot Selection': breakfastList.slice(5, 8).join(', '),
    Sides: breakfastList[8],
    Cereal: breakfastList[9],
    'Enriched Bread': breakfastList[10],
    'Daily Specials': breakfastList[11],
    Drinks: breakfastList[12],
  };
};

const isSpecialDinner = (day: number) => day % 2 === 0;

const generateDinner = (dinnerList: string[]): DinnerObject | undefined => {
  return {
    Rice: dinnerList[0],
    Pork: dinnerList[1],
    Chicken: dinnerList[2],
    Seafood: dinnerList[3],
    Sides: dinnerList.slice(4, 7).join(', '),
    Vegetables: dinnerList[7],
    'Soup of the Day': dinnerList[8],
    'Fruit / Dessert': dinnerList[9],
    Drinks: dinnerList[10],
  };
};

const generateSpecialDinner = (
  dinnerList: string[]
): SpecialDinnerObject | undefined => {
  return {
    'Set A': dinnerList[0],
    'Set B': dinnerList[5],
    'Fruit / Dessert': dinnerList[9],
    Drinks: dinnerList[10],
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
  const currentWeek = (Math.floor(numberOfDays / 7) % 4) + 1;
  return currentWeek;
}

// Get current day of the week
const getCurrentDay = () => {
  // getDay() return sunday as 0, monday as 1
  // Want monday as 1, tuesday as 2, ... sunday as 7
  return ((new Date().getDay() + 6) % 7) + 1;
};
