'use strict';

const {
  HttpCode,
  NOT_FOUND_TEXT
} = require(`../../constants`);
const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;

const DEFAULT_PORT = 3000;
const FILENAME = `${__dirname}/../mocks.json`;

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`;

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const onClientConnect = async (req, res) => {
  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILENAME);
        const mocks = JSON.parse(fileContent);
        const contentMarkup = `
        <ul>
          ${mocks.map((post) => `<li>${post.title}</li>`).join(``)}
        </ul>`;

        sendResponse(res, HttpCode.OK, contentMarkup);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, NOT_FOUND_TEXT);
        console.error(chalk.red(`Ошибка при отрисовке данных:`), err);
      }
      break;

    default:
      sendResponse(res, HttpCode.NOT_FOUND, NOT_FOUND_TEXT);
      console.error(chalk.red(`'${req.url}' ${NOT_FOUND_TEXT}`));
  }
};

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    http.createServer(onClientConnect)
      .listen(port)
      .on(`listening`, (err) => {
        return err ?
          console.error(chalk.red(`Ошибка при создании сервера`), err) :
          console.info(chalk.green(`Ожидаю соединений на ${port}`));
      });
  }
};
