const status = require('http-status');
const ApiError = require('./genericError');
const messages = require('../constants/messages')
const catchError = fn=>(req) => fn(req).catch((err)=>{
    next(new ApiError(messages.SOMETHING_WENT_WRONG,status.INTERNAL_SERVER_ERROR))
});

module.exports =catchError;