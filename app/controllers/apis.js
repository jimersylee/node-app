/**
 * @Author: Guoxing.han
 * @Date: 2017-10-17 14:21:01
 * @version 0.0.1
 */
const mongoose = require('mongoose');
const articles = mongoose.model('articles');


exports.articleGet = function (req, res) {
    articles
        .findOne({
            _id: req.params.id
        }, function (err, data) {
            if (!data) {
                res.json({code: 404, msg: "not found"});
            } else {
                res.json({code: 0, msg: "success", data: data});
            }
        })

};

exports.articleQuery = function (req, res) {
    /**
     * 查询所有文章
     */
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    console.log(page, size);
    let query = articles.find({});
    query.skip((page - 1) * size).limit(size);
    query.exec(function (err, data) {
        if (err) {
            res.json({code: 500, msg: err});
        }
        if (!data) {
            res.json({code: 404, msg: "empty"});
        }

        //查询总条数
        articles.where({}).count(function (err, total) {
            if (err) {
                console.log(err);
            }

            let isFirstPage = (page - 1 === 0);
            let isLastPage = (page - 1) * size + data.length === total;
            res.json({
                code: 200,
                msg: "success",
                data: data,
                count: total,
                page: page,
                isFirstPage: isFirstPage,
                isLastPage: isLastPage,
                refer: req.params
            });
        });


    });
};
exports.articleEdit = function (req, res) {
    console.log(req.body);

    /**
     * 按条件编辑
     * @param _id
     */
    /*
    articles.findOne({
      _id: req.params.id
    }, function (err, data) {
      if (err) {
        res.json({code: 0, msg: "err"});
      } else {
        data.title = req.body.title
        data.info = req.body.info
        data.save();
        res.json({code: 200, msg: "success", data: data, count: data.length, refer: req.params});

      }
    });
    */

    const published = req.body.published === "on" ? 1 : 0;
    const summary = req.body.html.substring(0, 600);

    const query = {
        _id: req.body._id
    };
    const options = {
        multi: true
    };
    articles.update(query, {
        $set: {
            title: req.body.title,
            md: req.body.md,
            html: req.body.html,
            gmt_modified: new Date(),
            published: published,
            summary: summary,
        }
    }, options, function (err, data) {
        if (err) {
            res.json({code: 9999, msg: err});
        } else {
            res.json({code: 200, msg: "success", data: req.body._id});
        }
    })

};
/**
 * 新增文章,需要管理员权限
 * @param req
 * @param res
 */
exports.articleAdd = function (req, res) {
    console.log(req.body)
    const published = req.body.published === "on" ? 1 : 0;
    const summary = req.body.html.substring(0, 600);
    const data = new articles({
        title: req.body.title,
        html: req.body.html,
        md: req.body.md,
        published: published,
        summary: summary,
        view_times: 0,
        gmt_created: new Date(),
        gmt_modified: new Date()
    });

    data.save(function (err) { // 执行保存，并查看返回情况
        if (err) {
            res.json({code: 0, msg: "err"});
        } else {
            res.json({code: 200, msg: "success", data: data, count: data.length, refer: req.params});

        }
    })

};
exports.articleDelete = function (req, res) {
    console.log(req.body);
    /**
     * 删除
     */
    const _id = req.body.id;
    articles.remove({
        _id: _id
    }, function (err, data) {
        if (err) {
            res.json({code: 0, msg: "err"});
        } else {
            res.json({code: 200, msg: "dele success", data: data, count: data.length, refer: req.params});
        }
    })

};

/**
 * 搜索
 * @param req
 * @param res
 */
exports.search = function (req, res) {
    let keyWord = req.body.key;
    let tag = req.body.tag;
    let page = req.body.page;
    let size = req.body.size;
    console.log("req:" + keyWord + "," + tag);
    /**
     * 查询所有文章
     */
    page = parseInt(page);
    size = parseInt(size);
    if (!page) {
        page = 1;
    }
    if (!size) {
        size = 10;
    }
    console.log("page:" + page, "size:" + size);
    let query;
    let countQuery;
    if (keyWord) {
        query = articles.find({html: new RegExp(keyWord)});
        countQuery = articles.where({html: new RegExp(keyWord)});
    } else if (tag) {
        query = articles.find({tag: new RegExp(tag)});
        countQuery = articles.where({tag: new RegExp(tag)});
    } else {
        res.json({code: 1, msg: "param error"});
        return;
    }

    query.skip((page - 1) * size).limit(size);
    query.exec(function (err, data) {
        if (err) {
            res.json({code: 500, msg: err});
        }
        if (!data) {
            res.json({code: 404, msg: "empty"});
        }

        //查询总条数
        countQuery.count(function (err, total) {
            if (err) {
                console.log(err);
            }

            let isFirstPage = (page - 1 === 0);
            let isLastPage = (page - 1) * size + data.length === total;
            res.json({
                code: 200,
                msg: "success",
                data: data,
                count: total,
                page: page,
                isFirstPage: isFirstPage,
                isLastPage: isLastPage,
                refer: req.params
            });
        });
    });
};

/**
 * 首页元素
 * @param req
 * @param res
 */
exports.homeInfo = function (req, res) {
    //test(req,res);


    /*let data = [];
    //获取近期热门文章,按点击数倒序,10条
    const size = 10;
    let query = articles.find({});
    query.limit(size);
    query.sort({"view_times": -1});
    let promise= query.exec();
    promise.then(
        function(viewData){
            return viewData;
            //res.json({code:200,msg:"success",data:data});
        },
        function (err) {
            res.json({code:500,msg:"error"})
        }

    ).then(
        function (viewData) {
            console.log(viewData);
            //查询文章分类
            res.json({code:200,msg:"success",data:viewData});
        }
    );


*/
    /**
     * 获取阅读数排行榜数据
     */
     function getViewData(){
        const size = 10;
        let query = articles.find({});
        query.limit(size);
        query.sort({"view_times": -1});
        return query.exec();
    }

    /**
     * 获取标签数据
     * @returns {Promise}
     */
    function getTagsData(){
        let query = articles.distinct("tags");
        return query.exec();
    }

    let querySomething = async function () {
        let viewData = await getViewData();
        let tagsData=await getTagsData();
        console.log(viewData,tagsData);
        res.json({code:200,data:{viewData:viewData,tagsData:tagsData}})
    };



    querySomething();



    //获取文章分类


    //获取标签
};

async function test(req,res){
    let viewData=await articles.find({});
    res.json({code:200,data:viewData});
}






