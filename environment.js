//
//
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');
const helper = require('./modules/helpers');
const _ = require('lodash');
/*
font: https://en.wikipedia.org/wiki/Deployment_environment
In software deployment, an environment or tier is a computer system in which a computer program or software component is deployed and executed.
*/
const LOCAL = 1; // Developer's desktop/workstation
const DEVELOPMENT = 2; //Development server aka sandbox.
const TEST_QA = 4; // Test /  Quality assurance team
const STAGE_PRE_PRODUCTION = 8; // Mirror of production environment
const PRODUCTION = 16; // Production/Live	Serves end-users/clients
//
const fileEnv = '.env';
const envPath = path.resolve(process.cwd(), fileEnv);
// const envConfig = require('dotenv').config({ path: envPath, encoding: 'utf8' });
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const forceToProcEnv = helper.toBoolean(envConfig._FORCE_TO_PROCESS_ENV);
const envPrefix = (envConfig.hasOwnProperty('_ENVIRONMENT_VAR_PREFIX')) ? envConfig._ENVIRONMENT_VAR_PREFIX : '';
//
const config = _.reduce(envConfig, function(result, value, key) { 
    const hasPublicProp = !_.startsWith(key, '_');
    if(hasPublicProp) {
        result[key] = value; 
    }
    if (hasPublicProp && forceToProcEnv) {
        process.env[`${envPrefix}${key}`] = value;
    }
    return result;
}, {});
//
function getEnvName(id) {
    switch (id) {
        case 1:
            return "LOCAL";
        case 2:
            return "DEVELOPMENT";
        case 4:
            return "TEST_QA";
        case 8:
            return "STAGE_PRE_PRODUCTION";
        case 16:
            return "PRODUCTION"
        default:
            return "LOCAL";
    }
}
//
const env = {
    "tiers": {
        "LOCAL": LOCAL,
        "DEVELOPMENT": DEVELOPMENT,
        "TEST_QA": TEST_QA,
        "STAGE_PRE_PRODUCTION": STAGE_PRE_PRODUCTION,
        "PRODUCTION": PRODUCTION,
        "getName": getEnvName
    },
    "httpPort": config.HTTP_PORT,
    "httpsPort": config.HTTPS_PORT
};
//
module.exports = env;