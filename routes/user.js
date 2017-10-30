
/**
 * @author: Jimersy Lee
 * @Date: 17-10-27 下午7:11
 * @github: jimersylee
 * @email: jimersylee@gmail.com
 * @Desc: 用户相关
 */

const express=require('express');
const router=express.Router();
const user=require("../app/controllers/users");

router.get("/reg",user.reg);
router.post("/doReg",user.doReg);
router.get("/login",user.login);
router.post("/doLogin",user.doLogin);

module.exports=router;


