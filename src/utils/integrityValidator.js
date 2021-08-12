const crypto = require('crypto');
const DataProcessorException = require('./DataProcessorException');

const validate = function (objectStats) {
    const stringKey = buildString(objectStats);
    const hash = crypto.createHash("md5").update(stringKey).digest("hex");
    if(objectStats.hash !== hash){
        throw new DataProcessorException("Validation Integrity Fails, hash are not the same", 500, null);
    }
    return true;
};

const buildString = (objectStats) =>
  Object.entries(objectStats)
    .filter((value) => value[0] !== "hash")
    .map((value) => value[1])
    .join("~");

module.exports = validate
