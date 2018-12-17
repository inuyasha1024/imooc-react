const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
//新建app
const app = express()

//work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection',function (socket) {
    //console.log('user login')
    socket.on('sendmsg',function (data) {
        //console.log(data)
        const {from, to, msg} = data
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},function (err,doc) {
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
        //io.emit('recvmsg',data)
    })
})




app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)


app.get('/',function (req,res) {

    res.send('<h2>Hello World</h2>')
})
/*app.get('/data',function (req,res) {
    User.findOne({user:'xiaoming'},function (err,doc) {
        res.json(doc)
    })
    //res.json({name:"imocc React App",type:"IT"})
})*/

server.listen(9093,function () {
    console.log('Node app start at port 9093')
})