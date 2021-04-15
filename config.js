const readjson = require("./lib/utils/readjson");
const colors = require('colors');

var loadedConfig = {}; // loaded configs
var configPath = '.deploytos3'; // default config path
const getConfigFile = (path) => {
    if (path) { configPath = path; }
    const c = readjson(configPath);
    return c;
}

module.exports = {
    getConfigFile,
    get: () => { return loadedConfig; },
    load: (inp) => {
        //load config file
        var config = getConfigFile(inp.configPath);

        //set speicific config attributes if specified in terminal 
        var attrs = config.env[config.defaults.env];
        if (inp && inp.env) { attrs = config.env[inp.env] }
        if (inp && inp.path) { attrs.path = inp.path; }
        if (inp && inp.s3Path && !(["", "/", '\\'].includes(inp.s3Path))) { attrs.s3Path = inp.s3Path; }
        if (inp && inp.profile) { attrs.profile = inp.profile; }
        if (inp && inp.region) { attrs.region = inp.region; }
        if (inp && inp.s3Bucket) { attrs.s3Bucket = inp.s3Bucket; }
        if (inp && inp.clearS3) { attrs.clearS3 = true; }//1
        if (inp && inp.ignorePathsJSON) { attrs.ignore = JSON.parse(inp.ignorePathsJSON); }
        if (inp && inp.ignorePathsJSON_S3) { attrs.ignoreS3 = JSON.parse(inp.ignorePathsJSON_S3); }//2

        loadedConfig = attrs;
        if (loadedConfig == undefined) { throw ("Config load failed! Please check your inputs and `.deploytos3` file!".red) }
        console.log('>'.green + ' Attributes Loaded: ', loadedConfig);
        return loadedConfig;
    }
}