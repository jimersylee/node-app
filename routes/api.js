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

//接口
router.get('/v1/:id', apis.getGroup);
router.post('/v1/edit/:id', apis.postGroup);
router.post('/v1/add', apis.addArticles);
router.post('/v1/dele', apis.deleArticles);

module.exports=router;



