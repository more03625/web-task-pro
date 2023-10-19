// Import required modules
import express, { Application, Request, Response, NextFunction } from 'express';
import { seoRouter } from './routes';
import cors from 'cors';
import dotenv from 'dotenv'
import path from 'path';

// Create an Express application
const app = express();
app.use(express.json());
app.use(cors());

const result = dotenv.config({ path: path.resolve(__dirname, `../env/.env.${process.env.NODE_ENV}`).trim() });
if (result.error) {
    throw new Error(`Error loading .env file: ${result.error}`);
}

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send({
        success: true,
        message: "Welcome to web-task-pro, helping you to eliminate common repetitive tasks!"
    });
});

app.get('/ping', (req: Request, res: Response, next: NextFunction) => {
    res.send('Thank you for pinging User Management!');
})

app.get('/health-check', (req: Request, res: Response, next: NextFunction) => {
    res.send('Health check working as it it!');
});

app.use('/api/seo', seoRouter);

const port = process.env.APP_PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'dev';

app.listen(port, () => {
    console.log(`Running PORT ${port} on ${NODE_ENV}`);
})
