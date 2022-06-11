## Установка

### 1) Установите Node.js(12.22.0 или новее) и npm
### 2) Установка зависимостей
*  `npm install`
### 3) Сборка
*  `npm run build`
### 4) Устанавливаем pm2 для демонизации
*  `sudo npm install pm2 -g`
* Запустим при помощи pm2
* `pm2 start npm --name "my-site" -- start`
* Добавляем автозапуск, для pm2 (если у вас не ubuntu найдите свою систему [тут](https://pm2.keymetrics.io/docs/usage/startup/#specifying-the-init-system))
* `pm2 startup ubuntu`
