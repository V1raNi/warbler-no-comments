const express = require('express');
const router = express.Router();
const { signin, signup } = require('../handlers/auth'); 

router.post('/signup', signup);

router.post('/signin', signin);

module.exports = router;