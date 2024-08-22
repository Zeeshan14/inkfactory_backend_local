const genericResponse =(message,data={},success=true,status=200)=>{
    return {
        message,
        status,
        success,
        data,
    }
}

module.exports = genericResponse;