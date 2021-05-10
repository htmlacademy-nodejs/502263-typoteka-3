'use strict';

const {
  getRandomInt,
  getRandomArrElements,
  getDeclension,
  createArrayFromFileContent,
  createFileFs
} = require(`../../utils`);
const chalk = require(`chalk`);

const DATE_MONTHS_INTERVAL_PRIOR_TO_NOW = 3;
const ANNOUNCE_MAX_LENGTH = 5;
const FILE_NAME = `mocks.json`;
const Amount = {
  DEFAULT: 1,
  MAX: 1000
};

const DataFilePaths = {
  SENTENCES: `../../data/sentences.txt`,
  TITLES: `../../data/titles.txt`,
  CATEGORIES: `../../data/categories.txt`
};

const getRandomDate = () => {
  let startDate = new Date();
  startDate.setMonth(startDate.getMonth() - DATE_MONTHS_INTERVAL_PRIOR_TO_NOW);
  const currentDate = new Date(startDate.getTime() + Math.random() * (new Date().getTime() - startDate.getTime()));

  return `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
};

const getTitle = (titles) => titles[getRandomInt(0, titles.length - 1)];

const generateOffers = (count, titles, categories, sentences) => {
  return Array(count).fill({}).map(() => ({
    title: getTitle(titles),
    createdDate: getRandomDate(),
    announce: getRandomArrElements(sentences, ANNOUNCE_MAX_LENGTH).join(` `),
    fullText: getRandomArrElements(sentences).join(` `),
    category: getRandomArrElements(categories)
  }));
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const offersCount = Number.parseInt(count, 10) || Amount.DEFAULT;

    if (offersCount > Amount.MAX) {
      console.error(chalk.red(`Не больше ${Amount.MAX} ${getDeclension(Amount.MAX, [`публикации`, `публикаций`, `публикаций`])}.`));
      process.exit();
    }

    const sentences = await createArrayFromFileContent(DataFilePaths.SENTENCES);
    const titles = await createArrayFromFileContent(DataFilePaths.TITLES);
    const categories = await createArrayFromFileContent(DataFilePaths.CATEGORIES);

    createFileFs(FILE_NAME, generateOffers(offersCount, titles, categories, sentences));
  }
};
