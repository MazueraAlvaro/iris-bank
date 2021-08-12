const dotenv = require("dotenv");
const DataProcessorException = require("./DataProcessorException");

const loadEnvVars = function () {
  const result = dotenv.config();
  if (result.error) {
    throw new DataProcessorException(
      "Error reading env vars, make sure you have .env file",
      500
    );
  }
};
module.exports = { loadEnvVars };
