'use strict';

const {
  getRandomInt,
  getRandomArrElements,
  getDeclension,
  createFileFs
} = require(`../../utils`);

const DATE_MONTHS_INTERVAL_PRIOR_TO_NOW = 3;
const ANNOUNCE_MAX_LENGTH = 5;
const FILE_NAME = `mocks.json`;
const Amount = {
  DEFAULT: 1,
  MAX: 1000
};

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо `,
];

const getRandomDate = () => {
  let startDate = new Date();
  startDate.setMonth(startDate.getMonth() - DATE_MONTHS_INTERVAL_PRIOR_TO_NOW);
  const currentDate = new Date(startDate.getTime() + Math.random() * (new Date().getTime() - startDate.getTime()));

  return `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
};

const getTitle = () => TITLES[getRandomInt(0, TITLES.length - 1)];

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    title: getTitle(),
    createdDate: getRandomDate(),
    announce: getRandomArrElements(SENTENCES, ANNOUNCE_MAX_LENGTH).join(` `),
    fullText: getRandomArrElements(SENTENCES).join(` `),
    category: getRandomArrElements(CATEGORIES)
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const offersCount = Number.parseInt(count, 10) || Amount.DEFAULT;

    if (offersCount > Amount.MAX) {
      console.info(`Не больше ${Amount.MAX} ${getDeclension(Amount.MAX, [`публикации`, `публикаций`, `публикаций`])}.`);
      process.exit();
    }

    createFileFs(FILE_NAME, generateOffers(offersCount));
  }
};
