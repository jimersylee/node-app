/**
 * @Author: Guoxing.han
 * @Date: 2017-10-16 15:23:52
 * @version 0.0.1
  */
const express = require('express');
const router = express.Router();
const admin=require("../app/controllers/admin");
const auth=require("./auth");
//admin后台的路由
router.get("/",function (req, res) {
    auth.checkLoginAndRedirect(req,res,"admin/");
    admin.index(req,res);
});


module.exports = router;
