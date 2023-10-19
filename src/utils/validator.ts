import { Request, Response, NextFunction } from 'express';
import response from './response';

const validate = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        return next();
    } catch (err: any) {
        return response.badRequest({ ...err, status: 400 }, res)
    }
};

export default validate;