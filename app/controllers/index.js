/**
 * @Author: Guoxing.han
 * @Date: 2017-10-17 14:21:01
 * @version 0.0.1
  */
const mongoose = require('mongoose');
const articles = mongoose.model('articles');
exports.articleQuery = function (req, res) {
  /*articles
    .find({})
    .exec(function (err, data) {
      res.render('index', {data: data});
    });*/
  res.render('index',{page:req.params.page})
};