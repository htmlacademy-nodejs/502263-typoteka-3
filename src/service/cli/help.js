'use strict';

const chalk = require(`chalk`);

module.exports = {
  name: `--help`,
  run() {
    console.info(chalk.gray(`
Программа запускает http-сервер и формирует файл с данными для API.

Гайд:
service.js <command>

Команды:

--version:            выводит номер версии
--server <port>:      запускает сервер на указанном порту. Без указания порта сервер запустится на 3000
--generate <count>:   формирует массив с тестовыми объявлениями в 
                      количестве count и сохраняет их в mocks.json
--help:               печатает список возможных команд
    `));
  }
};
