/**
 * @Author: Guoxing.han
 * @Date: 2017-10-17 11:19:15
 * @version 0.0.1
  */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _blogSchema = new Schema({
    title: {
        type: 'String'
    },
    html: {
        type: 'String'
    },
    md:{
        type:'String'
    },
    summary:{
        type:'String'
    },
    author:{
        type:"String"
    },
    published:{
        type:"Number"
    },
    //浏览次数
    view_times:{
        type:"Number"
    },
    gmt_created: Date,
    gmt_modified:Date,

});

module.exports = mongoose.model("articles", _blogSchema);