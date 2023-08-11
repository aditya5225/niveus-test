const transactionsDb = require('../models/transactionsModel');

const fetchtransactions = async (req, res, next) => {

    try {

        const { userId, fromDate, toDate, minAmount, maxAmount, page = 1, limit = 10 } = req.query;

        const matchQuery = {};

        if (userId) {
            matchQuery.userId = userId
        }

        if (minAmount || maxAmount) {
            matchQuery.amount = {
                ...(minAmount ? { $gte: parseFloat(minAmount) } : {}),
                ...(maxAmount ? { $lte: parseFloat(maxAmount) } : {})
            }
        }

        if (fromDate || toDate) {
            matchQuery.createdAt = {
                ...(fromDate ? { $gte: new Date(fromDate) } : {}),
                ...(toDate ? { $lte: new Date(toDate) } : {})
            }
        }


        const transactionsData = await transactionsDb.aggregate([
            { $match: matchQuery },
            {
                $facet: {
                    transactionsData: [{ $skip: (page - 1) * limit }, { $limit: parseInt(limit) }],
                    totalData: [{ $count: 'count' }]
                }
            },
            { $unwind: '$totalData' },
        ]);

        res.status(200).json({
            error: false,
            totalData: transactionsData && transactionsData[0]?.totalData?.count ? transactionsData[0].totalData.count : 0,
            transactionsData: transactionsData && transactionsData[0]?.transactionsData ? transactionsData[0].transactionsData : [],
            message: `Data fetched successfully!`
        });
    }
    catch (err) {
        res.status(500).json({
            error: true,
            message: err
        });
    }
}

const addTransaction = async (req, res, next) => {
    try {

        const newtransactionInst = new transactionsDb({
            userId: req.body.userId,
            amount: req.body.amount,
            totalAmount: req.body.totalAmount,
            quantity: req.body.quantity,
            status: 1,
            charges: req.body.charges,
            item_debt: req.body.item_debt,
        });

        newtransactionInst.save().then(async savedData => {
            res.status(200).json({
                error: false,
                addedData: savedData,
                message: `Added successfully!`
            });
        }).catch(err => {
            res.status(500).json({
                error: true,
                message: err.message
            });
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: true,
            message: err
        });
    }
}

module.exports = {
    fetchtransactions,
    addTransaction
}