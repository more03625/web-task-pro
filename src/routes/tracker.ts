import express, { Request, Response, NextFunction } from 'express';
import { response, validate } from '../utils';
import { trackerSchema } from '../schemas'; // Import the yup schema you created
import { trackerController } from '../controllers';

const server = express.Router();

server.get('/', validate(trackerSchema.get), async (req: Request, res: Response, next: NextFunction): Promise<Record<string, any> | void> => {
    try {
        const result = await trackerController.get(req);
        return response.send(result, res);
    } catch (err: any) {
        return next(err);
    }
});

export default server;