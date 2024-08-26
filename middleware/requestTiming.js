const logger = require('../config/logger');
const requestTiming = (req, res, next) =>{
    const startHrTime = process.hrtime();

    res.on('finish', ()=>{
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedHrTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;

        logger.info(`Request to ${req.method} ${req.originalUrl} took ${elapsedHrTimeInMs}ms`,{
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            elapsedTime: `${elapsedHrTimeInMs}ms`,
        });
    });
    next();
};

module.exports = requestTiming;