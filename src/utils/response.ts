import { Response } from "express";

const send = (result: Record<string, any>, res: Response): Record<string, any> => {
    const statusCode = result?.statusCode || 200;
    const data = {
        statusCode,
        success: true,
        data: result
    };
    return res.status(statusCode).json(data);
};

const responseObject = (statusCode: number, err: any, res: Response): Record<string, any> => {
    const errorObject = (err instanceof Error || err instanceof RangeError || err instanceof ReferenceError || err instanceof SyntaxError || err instanceof TypeError || err.statusCode) ? err : new Error(err.message ? err.message : err);
    const response = errorObject.statusCode ? errorObject : {
        statusCode,
        message: errorObject.message || 'Something went wrong!',
        stack: errorObject.stack || ''
    };
    // Insert to database.
    // Trigger the email.
    return res.send(response);
};

const badRequest = (err: any, res: Response) => {
    const statusCode = err?.statusCode || 400;
    return responseObject(statusCode, err, res);
};

const internalServerError = (err: any, res: Response): Record<string, any> => {
    const statusCode = err?.statusCode || 500;
    return responseObject(statusCode, err, res);
};

export default {
    send,
    badRequest,
    internalServerError
};
