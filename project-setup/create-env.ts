const fs = require('fs').promises;

const sourceFile = './.env.example';
const targetFile = 'env/.env.dev';
const directory = './env';

const createEnvFile = async () => {
    try {
        try {
            await fs.access(directory);
        } catch (error) {
            await fs.mkdir(directory, { recursive: true });
        }

        const content = await fs.readFile(sourceFile, 'utf8');

        await fs.writeFile(targetFile, content);
        console.log(`Created ${targetFile} from ${sourceFile}`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

createEnvFile();