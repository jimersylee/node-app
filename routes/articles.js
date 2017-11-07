/**
 * @author: Jimersy Lee
 * @Date: 17-10-27 下午4:35
 * @github: jimersylee
 * @email: jimersylee@gmail.com
 * @Desc: 文章路由
 */

const express=require("express");
const router=express.Router();
const articles = require('./../app/controllers/articles');
const auth=require('./auth');
//add
router.get('/add', function (req, res) {
    auth.checkLoginAndRedirect(req,res,"articles/add");
    articles.addArticle(req,res);
});
//pages
router.get('/:id', articles.getArticle);
//edit
router.get('/edit/:id', function(req,res){
    auth.checkLoginAndRedirect(req,res,"articles/edit/"+req.params.id);
    articles.editArticle(req,res);
});



router.get('/',function (req,res) {
   res.send('article index page');
});

module.exports=router;
