var path = require('path');
var chalk = require('chalk');
var ncp = require('ncp').ncp;

ncp.limit = 16;

var newProjectDir = process.cwd();
var generatorFilesPath = path.join(__dirname, '../generated');

console.log(chalk.blue('Generating your poppin\' fresh new application!'));

ncp(generatorFilesPath, newProjectDir, function (err) {
    if (err) return console.error(err);
    console.log(chalk.blue('All done!'));
    console.log(chalk.red('Don\'t forget to npm install!'));
    console.log(chalk.yellow('Afterwards, try out npm start!'));
});