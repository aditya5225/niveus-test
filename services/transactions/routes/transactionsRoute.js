const router = require('express').Router();
const transactionController = require('../controllers/transactionController');

router.get('/fetch_transactions', transactionController.fetchtransactions);
router.post('/add_transaction', transactionController.addTransaction);

module.exports = router;