/**
 * @Author: Guoxing.han
 * @Date: 2017-10-17 14:21:01
 * @version 0.0.1
 */
const mongoose = require('mongoose');
const articles = mongoose.model('articles');

exports.articleQuery = function (req, res) {
    /**
     * 查询所有文章
     */
    const page=parseInt(req.query.page);
    const size=parseInt(req.query.size);
    console.log(page,size);
    let query=articles.find({});
    query.skip((page-1)*size).limit(size);
    query.exec(function(err,data){
        if(err){
            res.json({code:500,msg:err});
        }
        if(!data){
            res.json({code:404,msg:"empty"});
        }

        //查询总条数
        articles.where({}).count(function (err, total) {
            if(err){
                console.log(err);
            }

            let isFirstPage=(page-1===0);
            let isLastPage=(page-1)*size+data.length===total;
            res.json({code:200,msg:"success",data:data,count:total,page:page,isFirstPage:isFirstPage,isLastPage:isLastPage,refer:req.params});
        });


    });
};
exports.articleEdit = function (req, res) {
    console.log(req.body)

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
    const query = {
        _id: req.params.id
    };
    const options = {
        multi: true
    };
    articles.update(query, {
        $set: {
            title: req.body.title,
            info: req.body.info
        }
    }, options, function (err, data) {
        if (err) {
            res.json({code: 0, msg: "err"});
        } else {
            res.json({code: 200, msg: "success", data: data, count: data.length, refer: req.params});
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
    const summary=req.body.html.substring(0,600);
    const data = new articles({
        title: req.body.title,
        html: req.body.html,
        md: req.body.md,
        published:published,
        summary:summary,
        view_times:0,
        gmt_created: new Date(),
        gmt_modified:new Date()
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