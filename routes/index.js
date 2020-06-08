/** Creating root Route For All Api's */
const express = require('express');

const router = express.Router();

router.use('/pets', require('./pets'));

router.use('/users', require('./users'));

module.exports = router;