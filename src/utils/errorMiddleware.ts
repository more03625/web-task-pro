import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(req.ip, next.name);

    let statusCode = err.statusCode || err.status || 500;
    let error = (err.message) ? { message: err.message } : err;

    let data = {
        success: false,
        error: error
    }
    res.status(statusCode).send(data);
}

export default errorMiddleware;