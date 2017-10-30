/**
 * @Author: Guoxing.han
 * @Date: 2017-10-13 15:57:36
 * @version 0.0.1
 */
const admin = require('./admin');
const home = require('./home');
const api = require('./api');
const articles=require('./articles');
const user=require('./user');


const myRoutes = (app) => {
    //home
    app.use('/', home);

    //文章article
    app.use('/articles',articles);

    //admin
    app.use('/admin', admin);

    //api
    app.use('/api', api);

    //something
    app.get('/aa', function (req, res) {
        res.send('aa')
    });

    app.use('/user',user);
};

module.exports = myRoutes;