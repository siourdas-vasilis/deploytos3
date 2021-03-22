#!/usr/bin/env node

const { program } = require('commander');
var colors = require('colors');

// Setup CLI
program
    .version(" version: " + require('./package.json').version.cyan, '-v')
    .name('deploytos3')
    .description(require('./lib/welcome/welcome').welcomeMessage);

// Upload Command
program.command('upload')
    .description("Upload your files to your S3 bucket")
    .option('-c, --config <configPath>', 'Specify the config file of the project', '.deploytos3')
    .option('-e, --env <env>', 'Specify environment that will be used from `config.js` file. ', 'dev')
    .option('-p, --path <path>', 'Specify path of the folder that will be uploaded. ')
    .option('-pr, --profile <profile>', 'Specify AWS profile ')
    .option('-s3, --s3-bucket <bucket>', 'Specify the S3 bucket')
    .option('-ig, --ignore <ignorePathsJSON>', 'Ignore paths or files for the upload procedure (JSON format)')
    .option('-ig-s3, --ignore-s3 <ignorePathsJSON_S3>', 'Ignore paths of S3 (JSON format)')
    .option('-cl-s3, --clear-s3', 'Option to delete existing files in S3 before upload begins (used with  --ignore-s3  to avoid deletion of specific paths/files)')
    .action(async (inp) => {

        const app = require('./index.js');
        app.config.load(inp);
        app.run().catch(err => console.error(err));
    })

program.command('check')
    .description("Show config file.  \n(this command is a tool to check if the config file is found and parsed successfully.)")
    .option('-c, --config <configPath>', 'Specify your config file', '.deploytos3')
    .action(async (inp) => {
        try {
            const configFile = require('./config').getConfigFile();
            console.log('\n >'.cyan + ' Config File Found: \n .................... \n', configFile);
        } catch (err) {
            console.log(`:: ERROR :: `.red, colors.yellow(err));
        }
    })


program.parse(process.argv);

