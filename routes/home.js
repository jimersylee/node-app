/**
 *
 * @type {*|createApplication}
 */
const express = require('express');
const router = express.Router();
const index = require('../app/controllers/index');

router.get('/', function (req, res, next) {
    res.render('index', {page: 1});
});
router.get('/p/:page', index.articleQuery);

module.exports = router;
