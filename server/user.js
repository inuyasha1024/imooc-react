const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const utils = require('utility')

const _filter = {pwd:0,_v:0}

Router.get('/remove',function (req,res) {
    User.remove({},function (err,doc) {
        return res.json(doc)
    })
})

Router.get('/list',function (req,res) {
    const type = req.query.type
    User.find({type},_filter,function (err,doc) {
        return res.json({code:0,data:doc})
    })
})

Router.post('/register',function (req,res) {
    const {user,pwd,type} = req.body
    User.findOne({user:user},function (err,doc) {
        if (doc){
            return res.json({code:1,msg:'repeat username'})
        }
        const userModel = new User({user,type,pwd:md5Pwd(pwd)})
        userModel.save(function (err,doc) {
            if (err){
                return res.json(err)
            }else {
                const {user,type, _id} = doc
                res.cookie('userid',_id)
                return res.json({code:0,data:{user,type,_id}})
            }
        })

        /*User.create({user,pwd: md5Pwd(pwd),type},function (err,doc) {
            if(err){
                return res.json({code:1,msg:'server error'})
            }
            return res.json({code:0})
        })*/
    })
})

Router.get('/info',function (req,res) {
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function (err,doc) {
        if (err){
            return res.json({code:1,msg:'server error'})
        }
        if (doc){
            return res.json({code:0,data:doc})
        }
    })

})

Router.post('/login',function (req,res) {
    const {user,pwd} = req.body
    User.findOne({user:user,pwd:md5Pwd(pwd)},_filter,function (err,doc) {
        if(!doc){
            return res.json({code:1,msg:'incorrect username or password'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})

Router.post('/update',function (req,res) {
    const userid = req.cookies.userid
    if(!userid){
        return res.json({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,function (err,doc) {
        const data = Object.assign({},{
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({code:0,data:data})
    })
})

Router.get('/getmsgList',function (req,res) {
    const user = req.cookies.userid
    console.log(user)
    User.find({},function (err,doc) {
        let users = {}
        doc.forEach(v=>{
            users[v._id] = {name:v.user,avatar: v.avatar}
        })
        Chat.find({'$or':[{from:user},{to:user}]},function (err,doc) {
            if (!err){
                //console.log(doc)
                return res.json({code:0,msgs:doc, users:users})
            }
        })
    })
    //{'$or':[{from:user,to:user}]}

})


function md5Pwd(pwd){
    const salt = 'imooc_is_good_1232121'
    return utils.md5(utils.md5(pwd+salt))
}


module.exports = Router