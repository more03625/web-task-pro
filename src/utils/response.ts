import { Response } from "express";

const send = (result: Record<string, any>, res: Response): void => {
    const statusCode = result?.statusCode || 200;
    const data = {
        statusCode,
        success: true,
        data: result
    };
    res.status(statusCode).json(data);
};

const error = (err: any, res: Response): void => {
    const statusCode = err?.statusCode || 500;
    const validationErrors = err.inner.map((errorItem: any) => ({
        message: errorItem.message,
        key: errorItem.path,
    }));
    const errorResponse = {
        statusCode: 400,
        success: false,
        message: 'Validation error',
        details: validationErrors,
    };
    res.status(statusCode).json(errorResponse);
};

const responseObject = (statusCode: number, err: any, res: Response) => {
    const errorObject = (err instanceof Error || err instanceof RangeError || err instanceof ReferenceError || err instanceof SyntaxError || err instanceof TypeError || err.statusCode) ? err : new Error(err.message ? err.message : err);
    const response = errorObject.statusCode ? errorObject : {
        statusCode,
        message: errorObject.message || 'Something went wrong!',
        stack: errorObject.stack || ''
    };
    return res.send(response);
};

const badRequest = (err: any, res: Response) => {
    const statusCode = err?.statusCode || 400;
    return responseObject(statusCode, err, res);
};

const internalServerError = (err: any, res: Response) => {
    const statusCode = err?.statusCode || 500;
    return responseObject(statusCode, err, res);
};

export default {
    send,
    error,
    badRequest,
    internalServerError
};
