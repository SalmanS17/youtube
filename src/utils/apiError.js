class apiError extends Error {
    constructor(
        statusCode,
        message="Something went wrong",
        error = " ",
        statck = "s="
    ){
        super(message)
        this.statusCode = statusCode
        this.data = message
        this. success = false
        this.errors = errors

        if (stack){
            this.stack = statck
        }else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {apiError}