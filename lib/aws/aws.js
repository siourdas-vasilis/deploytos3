//Initiate the AWS enviroment

module.exports = {
    config: (config = { profile: "", region: "" }) => {
        var AWS = require('aws-sdk');
        AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: config.profile });
        AWS.config.region = config.region;
        return AWS;
    }
};