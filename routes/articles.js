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
//pages
router.get('/:id', articles.getArticle);
//edit
router.get('/edit/:id', articles.editArticle);
//add
router.get('/add', articles.addArticle);

router.get('/',function (req,res) {
   res.send('article index page');
});
module.exports=router;
