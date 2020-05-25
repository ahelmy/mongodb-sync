var dotenvExpand = require('dotenv-expand')
dotenvExpand(require('dotenv').config());

require('babel-register');
require('babel-polyfill');

require('./main').main();