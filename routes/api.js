/**
 * @author: Jimersy Lee
 * @Date: 17-10-27 下午4:18
 * @github: jimersylee
 * @email: jimersylee@gmail.com
 * @Desc: api路由模块
 */
const express=require("express");
const router=express.Router();
const apis = require('./../app/controllers/apis');
const auth=require('./auth');

//接口
router.get('/v1/articles/query', apis.articleQuery);
router.post('/v1/articles/edit/:id', apis.articleEdit);
router.post('/v1/articles/add', function (req, res) {
    auth.checkLoginAndReturnJSON(req,res,"article/add");
    apis.articleAdd(req,res);
});

router.post('/v1/articles/delete', function (req, res) {
    const articleId=req.body.id;
    if(!auth.checkLoginAndReturnJSON(req,res,"articles/"+articleId)){
        return;
    }
    apis.articleDelete(req,res);
});

module.exports=router;



