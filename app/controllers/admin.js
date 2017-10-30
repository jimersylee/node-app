
const moment = require('moment');
const mongoose = require('mongoose');
const auth=require('../../routes/auth');


exports.index = function (req, res) {
    res.render('admin/index');
};
