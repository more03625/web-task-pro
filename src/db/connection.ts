import mongoose from 'mongoose';
import { IDbConnectionOptions } from '../interfaces';

const connectDatabase = async (db: IDbConnectionOptions) => {
    try {
        // const response = await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rlosg.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`);
        const dbString = `mongodb://${db.host}:${db.port}/${db.dbName}`;
        const response = await mongoose.connect(dbString);
        return response;
    } catch (error) {
        console.log("connectDatabase ====> ", error);
    }
}

export default connectDatabase;