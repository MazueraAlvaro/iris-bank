const DataProcessorException = require("../utils/DataProcessorException");
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
    
}

module.exports = {init}