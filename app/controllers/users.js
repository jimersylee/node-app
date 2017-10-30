/**
 * @author: Jimersy Lee
 * @Date: 17-10-27 下午6:47
 * @github: jimersylee
 * @email: jimersylee@gmail.com
 * @Desc: 用户控制器
 */

const mongoose = require("mongoose");
const userModel = mongoose.model('users');
//打开登录页面
exports.login = function (req, res) {
    res.render("user/login");
};
//登录验证
exports.doLogin = function (req, res) {
    console.log(req.body.name, req.body.password);
    userModel.findOne(
        {name: req.body.name, password: req.body.password},
        function (err, data) {
            if (err) {
                res.send("登录异常");
            } else {
                console.log(data);
                if (data) {
                    //登录成功后的操作
                    //todo:写入cookie
                   req.session.login=1;
                   console.log("req.session.login:"+req.session.login);
                    //返回来源页
                    res.send("登录成功");
                } else {
                    res.send("密码错误");
                }


            }
        }
    )
};
//注册页面
exports.reg = function (req, res) {
    res.render("user/reg");
};
//注册动作
exports.doReg = function (req, res) {
    console.log(req.body);
    /**
     * 新增
     */
    const data = new userModel({name: req.body.name, password: req.body.password, gmt_created: new Date()});

    data.save(function (err) { // 执行保存，并查看返回情况
        if (err) {
            res.json({code: 0, msg: "err"});
        } else {
            res.json({code: 200, msg: "success", data: data, count: data.length, refer: req.params});

        }
    })

};
//个人资料查看
exports.info = function (req, res) {

};





