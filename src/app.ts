// Import required modules
import express, { Request, Response, NextFunction } from 'express';
import { seoRouter } from './routes';
import cors from 'cors';
import dotenv from 'dotenv'
import path from 'path';
import semver from 'semver';
import 'esm';
import packageJson from '../package.json';

const app = express();
app.use(express.json());
app.use(cors());

const result = dotenv.config({ path: path.resolve(__dirname, `../env/.env.${process.env.NODE_ENV}`).trim() });
if (result.error) {
    throw new Error(`Error loading .env file: ${result.error}`);
}

if (!semver.satisfies(process.version, `>=${packageJson.engines.node}`)) {
    console.error(`Required Node.js version is ${packageJson.engines.node}, but you are using ${process.version}.`);
    process.exit(1);
}

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    console.log(req.ip);
    res.send({
        success: true,
        message: "Welcome to web-task-pro, helping you to eliminate common repetitive tasks!"
    });
    return next()
});

app.get('/ping', (req: Request, res: Response, next: NextFunction) => {
    console.log(req.ip);
    res.send('Thank you for pinging User Management!');
    return next()
})

app.get('/health-check', (req: Request, res: Response, next: NextFunction) => {
    console.log(req.ip);
    res.send('Health check working as it it!');
    return next()
});

app.use('/api/seo', seoRouter);

const port = process.env.APP_PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'dev';

app.listen(port, () => {
    console.log(`Running PORT ${port} on ${NODE_ENV}`);
})
