
class DataProcessorException extends Error{

    constructor(message, code, originalError){
        super(message)
        this.code = code
        this.originalError = originalError
    }
}

module.exports = DataProcessorException;