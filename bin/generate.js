var bluebird = require('bluebird');
var path = require('path');
var chalk = require('chalk');
var ncp = bluebird.promisify(require('ncp').ncp);
var rename = bluebird.promisify(require('fs').rename);

ncp.limit = 16;

var newProjectDir = process.cwd();
var generatorFilesPath = path.join(__dirname, '../generated');


var copyFiles = function () {
    return ncp(generatorFilesPath, newProjectDir);
};

var renameGitignore = function () {
    var oldPath = path.join(newProjectDir, 'gitignore.txt');
    var newPath = path.join(newProjectDir, '.gitignore');
    return rename(oldPath, newPath);
};

console.log(chalk.green('Generating your new, poppin\' fresh application!'));
copyFiles().then(renameGitignore).then(function () {
    console.log(chalk.blue('All done!'));
    console.log(chalk.red('Do not forget to'), chalk.yellow('npm install'), 'AND', chalk.green('gulp build'));
});




