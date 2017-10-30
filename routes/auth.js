/**
 * @author: Jimersy Lee
 * @Date: 17-10-29 下午6:57
 * @github: jimersylee
 * @email: jimersylee@gmail.com
 * @Desc: 权限验证模块
 */

/**
 * 检查是否登录且跳转到登录页
 * @param req
 * @param res
 * @param refer
 */
exports.checkLoginAndRedirect=function(req,res,refer){
    if(!req.session.login){
        //未登录,返回登录页,带上来源
        res.render('user/login',{refer:refer});
    }
};
/**
 * 检查是否登录且返回json
 * @param req
 * @param res
 * @param refer
 */
exports.checkLoginAndReturnJSON=function(req,res,refer){
    if(!req.session.login){
        //未登录,返回登录页,带上来源
        res.json({code:404,msg:'not login'});
        return false;
    }else{
        return true;
    }
};




