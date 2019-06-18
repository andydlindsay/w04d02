const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.render('villains');
});

module.exports = router;
