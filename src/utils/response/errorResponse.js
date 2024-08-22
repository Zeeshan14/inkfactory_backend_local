const errorResponse =(message=messages.SOMETHING_WENT_WRONG,data={},success=false,status=500)=>{
    return {
        message,
        status,
        success,
        data,
    }
}
module.exports =errorResponse;