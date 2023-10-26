import { Request } from 'express';
import { ITracker } from "../interfaces";
import { trackerModel } from "../models";
import { response } from "../utils";

const get = async (req: Request) => {
    try {
        const query: { [key: string]: string } = {};

        if (req.query.pageUrl) {
            query.pageUrl = req.query.pageUrl.toString();
        }

        const page = parseInt(req.query.page as string) || 1;
        const perPage = parseInt(req.query.perPage as string) || 10;

        const skip = (page - 1) * perPage;
        const limit = perPage;

        const count = await trackerModel.countDocuments(query);
        const result = await trackerModel.find(query).skip(skip).limit(limit);
        return { count, result }
    } catch (err) {
        return response.internalServerError(err);
    }
}

const logUserInfo = async (data: ITracker) => {
    try {
        return await trackerModel.create(data);
    } catch (err) {
        return response.internalServerError(err);
    }
}

export default {
    get,
    logUserInfo,
}