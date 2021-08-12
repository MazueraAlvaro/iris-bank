const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const DataProcessorException = require("../utils/DataProcessorException");

const saveStats = async function (objectStats) {
  const dynamoClient = new DynamoDBClient({
    credentials: {
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      accessKeyId: process.env.ACCESS_KEY_ID,
    },
    region: process.env.AWS_REGION,
  });

  const command = new PutItemCommand({
    TableName: "fdr-table-22122020",
    Item:  {
        totalContactoClientes: {N: objectStats.totalContactoClientes},
        motivoReclamo: {N: objectStats.motivoReclamo},
        motivoGarantia: {N: objectStats.motivoGarantia},
        motivoDuda: {N: objectStats.motivoDuda},
        motivoCompra: {N: objectStats.motivoCompra},
        motivoFelicitaciones: {N: objectStats.motivoFelicitaciones},
        motivoCambio: {N: objectStats.motivoCambio},
        motivoDuda: {N: objectStats.motivoDuda},
        timestamp: {S: (new Date).toISOString()}
    },
  });
  const response = await dynamoClient.send(command);
  if(response["$metadata"].httpStatusCode !== 200){
      throw new DataProcessorException("Error saving data on DynamoDB");
  }
  return true;
};

module.exports = {saveStats}