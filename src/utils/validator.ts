import { Request, Response, NextFunction } from 'express';

const validate = (schema: any, path: string = 'body') => async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(res.status, path);

        const obj = { body: req.body, params: req.params, query: req.query }
        await schema.validate(obj, { abortEarly: true });
        return next();
    } catch (err: any) {
        return next(err);
    }
};

export default validate;