const usersDb = require('../models/usersModel');

const fetchUsers = async (req, res, next) => {

    try {

        const limitData = req.query.limit && req.query.limit >= 0 ? req.query.limit : 10;
        const skipData = req.query.skip && req.query.skip >= 0 ? (req.query.skip - 1) * limitData : 0;

        const usersData = await usersDb.aggregate([
            {
                $facet: {
                    usersData: [{ $skip: +skipData }, { $limit: +limitData }],
                    totalData: [{ $count: 'count' }]
                }
            },
            { $unwind: '$totalData' },
        ]);

        res.status(200).json({
            error: false,
            totalData: usersData && usersData[0]?.totalData?.count ? usersData[0].totalData.count : 0,      // Please uncomment it to test aggregate logic.
            usersData: usersData && usersData[0]?.usersData ? usersData[0].usersData : [],
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

const addUsers = async (req, res, next) => {
    try {

        const newUsersInst = new usersDb({
            userId: req.body.userId,
            name: req.body.name,
            dob: req.body.dob,
            gender: req.body.gender,
            mobile: req.body.mobile,
            email: req.body.email,
            address: {
                address: req.body.address,
                city: req.body.city,
                country: req.body.country,
                pin_code: req.body.pin_code,
                state: req.body.state,
            },
        });

        newUsersInst.save().then(async savedData => {
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
        res.status(500).json({
            error: true,
            message: err
        });
    }
}

module.exports = {
    fetchUsers,
    addUsers
}