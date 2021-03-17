const fs = require('fs');

module.exports = (path) => {
    try {
        return JSON.parse(fs.readFileSync(require.resolve(process.cwd() + '/' + path), { encoding: 'utf-8' }));
    } catch (error) {
        var colors = require('colors');
        throw (error.message.red);
    }
}