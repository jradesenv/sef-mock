module.exports = function(builder) {
    builder.addModule(responseHelper);

    function responseHelper() {
        //definition        
        var helper = this;
        helper.sendSuccess = sendSuccess;
        helper.sendError = sendError;

        //implementation
        function sendSuccess(res, data, next) {
            res.status(200).send({
                "ResultCode": "OK",
                "Data": data    
            });
            next();
        }

        function sendError(res, msg, next) {
            res.status(200).send({
                "ResultCode": "Error",
                "Messages": [
                    {
                        "Message": msg
                    }
                ]    
            });
            next();
        }

        return helper;
    }
};
