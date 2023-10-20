import express, { Request, Response } from 'express';
import { response } from '../utils';
import { seoSchema } from '../schemas'; // Import the yup schema you created
import { validate } from '../utils';
import { seoModel } from '../models';

const server = express.Router();

server.get('/', validate(seoSchema.getSeo), async (req: Request, res: Response): Promise<Record<string, any>> => {
    try {
        const pageUrl = req.body.pageUrl;
        const siteName = req.body.siteName;

        const result = {
            success: true,
            message: 'Welcome to the home of SEO!',
            data: { pageUrl, siteName }
        };
        return response.send(result, res);
    } catch (err: any) {
        return response.internalServerError(err, res);
    }
});

server.post('/', validate(seoSchema.addSeo), async (req: Request, res: Response): Promise<Record<string, any>> => {
    try {
        const result = await seoModel.create(req.body);
        return response.send(result, res);
    } catch (err) {
        return response.internalServerError(err, res);
    }
});

export default server;