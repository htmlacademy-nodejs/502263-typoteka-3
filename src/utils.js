'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [arr[i], arr[randomPosition]] = [arr[randomPosition], arr[i]];
  }

  return arr;
};

const getDeclension = (number, titlesArr) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titlesArr[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

const getRandomArrElements = (arr, maxAmount = arr.length - 1) => shuffle(arr).slice(0, getRandomInt(1, maxAmount));

const createArrayFromFileContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    throw err;
  }
};

const createFileFs = async (fileName, content) => {
  try {
    await fs.writeFile(fileName, JSON.stringify(content));
    console.info(chalk.green(`Файл ${fileName} создан. Количество публикаций: ${content.length}.`));
  } catch (err) {
    console.error(chalk.red(err));
    throw err;
  }
};

module.exports = {
  getRandomInt,
  shuffle,
  getDeclension,
  getRandomArrElements,
  createArrayFromFileContent,
  createFileFs
};
