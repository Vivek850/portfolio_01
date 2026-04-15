const express = require('express');
const { handleUserSignup } = require('../controllers/user');
const router = express.Router();

router.post('/', (req, res) => {
    res.send('User registration endpoint');
});

module.exports = router;