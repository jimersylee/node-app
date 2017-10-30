/**
 * @Author: Guoxing.han
 * @Date: 2017-10-17 14:21:01
 * @version 0.0.1
 */
const moment = require('moment');
const mongoose = require('mongoose');
const articles = mongoose.model('articles');
exports.getArticle = function (req, res) {
    articles
        .findOne({
            _id: req.params.id
        }, function (err, data) {
            if (!data) {
                res.render('404', {title: 404});
            } else {
               _increaseViewTimes(data._id,data.view_times);
                res.render('articles/view', {
                    _id: data._id,
                    title: data.title,
                    html: data.html,
                    gmt_created: moment(data.gmt_created).format('YYYY年MM月DD日 HH:mm:ss'),
                    gmt_modified:moment(data.gmt_modified).format('YYYY年MM月DD日 HH:mm:ss'),
                });
            }
        })
};

/**
 * 增加某文章的浏览次数
 */
function  _increaseViewTimes(id,oldTimes){
    const query = {
        _id: id
    };
    const options = {
        multi: true
    };
    articles.update(query, {
        $set: {
            view_times: oldTimes+1,
        }
    }, options, function (err, data) {
        console.log(err);
    })
}

exports.editArticle = function (req, res) {
    articles
        .find({
            _id: req.params.id
        }, function (err, data) {
            if (err) {
                res.render('404', {title: 404});
            } else {
                res.render('admin/edit', {
                    _id: data[0]._id,
                    title: data[0].title,
                    info: data[0].info
                });

            }
        })
};

exports.addArticle = function (req, res) {
    res.render('admin/add', {});
};