import geoIp from "geoip-lite";
import UAParser from 'ua-parser-js';

import { NextFunction, Request, Response } from 'express';

const trackUser = (req: Request, res: Response) => {
    console.log(res.addListener);

    // Intercept the incoming request here
    const uaParser = new UAParser();

    const shortId = req.url.substring(1);

    // Get the user's IP address
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const geolocation = ipAddress ? geoIp.lookup(ipAddress.toString()) : '';

    const userAgent = req.headers['user-agent'] || '';

    uaParser.setUA(userAgent);

    const uaParserResult = uaParser.getResult();

    // Prepare a data Object
    const data = {
        shortId: shortId,
        referer: req.headers.referer,
        ipAddress,
        timestamp: new Date().toISOString(),
        demographic: { ...uaParserResult },
        geolocation,
    };

    return JSON.stringify(data);
}
const middleware = (req: Request, res: Response, next: NextFunction): void => {
    const trackingResponse = trackUser(req, res);
    console.log('trackingResponse ====> ', trackingResponse);

    next();
}

export default middleware;