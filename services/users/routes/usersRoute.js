const router = require('express').Router();
const usersController = require('../controllers/usersController');

router.get('/fetch_users', usersController.fetchUsers);
router.post('/add_users', usersController.addUsers);

module.exports = router;