const path = require('path');
const app = require('express')();
const glob = require('glob');

const mockFile = glob.sync(path.resolve(__dirname, './*/*/*.js'));

mockFile.forEach(path => {
  app.use('/', require(path));
});
module.exports = app;
