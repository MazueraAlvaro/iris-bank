const DataProcessorException = require("../utils/DataProcessorException");
const awsS3Service =  require("../services/awsS3.service");
const dynamoDBService = require("../services/awsDynamoDB.service");
const integrityValidator = require("../utils/integrityValidator");
const envVarsLoader =  require("../utils/envVarsLoader")
const init = async function(event, context){
    try {
        return await startProcess(); 
    } catch (error) {
        if(error instanceof DataProcessorException){
            throw error;
        }
        else{
            throw new DataProcessorException("Unhandled Error", 500, error)
        }
    }
}

const startProcess = async function(){
    //Load env vars
    envVarsLoader.loadEnvVars()
    // Get stats from S3 bucket file
    const objectStats = await awsS3Service.getContactStats();
    // Validate Integrity
    integrityValidator(objectStats);
    //Save data into DynamoDB
    await dynamoDBService.saveStats(objectStats);
    // Delete stats from S3 Bucket
    await awsS3Service.deleteStats();
}

module.exports = {init}