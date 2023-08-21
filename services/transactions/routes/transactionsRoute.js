const router = require('express').Router();
const transactionController = require('../controllers/transactionController');
const redis = require('redis');
const redisClient = redis.createClient();

redisClient.connect();
redisClient.on('ready', () => console.log("Redis Connected!"));
redisClient.on('error', (err) => console.error(`Redis error: ${err}`));

const cacheMiddleware = async (req, res, next) => {
    const cacheKey = req.originalUrl;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
        res.json(JSON.parse(cachedData));
    }
    else {
        res.sendResponse = res.json;
        res.json = (data) => {
            redisClient.set(cacheKey, JSON.stringify(data), { EX: 3600 });
            res.sendResponse(data);
        };
        next();
    }
};

router.get('/fetch_transactions', cacheMiddleware, transactionController.fetchtransactions);
router.post('/add_transaction', transactionController.addTransaction);

module.exports = router;