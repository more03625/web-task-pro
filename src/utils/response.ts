import { Response } from "express";

const send = (result: Record<string, any>, res: Response): Record<string, any> => {
    const statusCode = result?.statusCode || 200;
    const data = {
        success: true,
        data: result
    };
    return res.status(statusCode).send(data);
};

const responseObject = async (statusCode: number, err: any): Promise<Record<string, any>> => {
    const errorObject = (err instanceof Error || err instanceof RangeError || err instanceof ReferenceError || err instanceof SyntaxError || err instanceof TypeError || err.statusCode) ? err : new Error(err.message ? err.message : err);
    const response = errorObject.statusCode ? errorObject : {
        statusCode: statusCode,
        message: errorObject.message || 'Something went wrong!',
        stack: errorObject.stack || ''
    };
    // Insert to database.
    // Trigger the email.
    return Promise.reject(response);
};

const badRequest = (err: any): Record<string, any> => {
    const statusCode = err?.statusCode || 400;
    return responseObject(statusCode, err);
};

const internalServerError = (err: any): Record<string, any> => {
    const statusCode = err?.statusCode || 500;
    return responseObject(statusCode, err);
};

const conflict = (err: any): Record<string, any> => {
    const statusCode = err?.statusCode || 409;
    return responseObject(statusCode, err);
};

const notFound = (err: any): Record<string, any> => {
    const statusCode = err?.statusCode || 404;
    return responseObject(statusCode, err);
};


export default {
    send,
    badRequest,
    internalServerError,
    conflict,
    notFound
};
