var environment = process.env.NODE_ENV;
var path = require('path');
var devConfigPath = path.join(__dirname, './development.json');
var productionConfigPath = path.join(__dirname, './production.json');

if (environment === 'production') {
    // TODO: define what file we look for.
    module.exports = require(productionConfigPath);
} else {
    module.exports = require(devConfigPath);
}