import React from 'react'
import {List, InputItem,NavBar, Icon} from  'antd-mobile'
import './chat.css'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {getMsgList, sendMsg,recvMsg} from "../../redux/chat.redux";


const socket = io('ws://localhost:9093')

@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props)

        this.state={
            text:'',
            msg:[]
        }
        //this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
/*        socket.on('recvmsg',data=> {
            this.setState({msg:[...this.state.msg,data.text]})
        })*/
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    handleSubmit(){
        //socket.emit('sendmsg',{text:this.state.text})
        this.setState({text:""})
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        console.log(to)
        this.props.sendMsg({from,to,msg})

    }

    render(){
        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        if(!users[userid]){
            return null
        }
        return (
            <div id='chat-page'>
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={()=>{
                        this.props.history.goBack()
                    }}
                    mode='dark'>
                    {users[userid].name}
                </NavBar>
                {this.props.chat.chatmsg.map(v=>{
                    const avatar = require('../img/'+users[v.from].avatar+'.jpg')
                    return v.from == userid?(
                        <List key={v._id}>
                            <Item
                                thumb={avatar}
                            >receive: {v.content}</Item>
                        </List>

                    ):(
                        <List key={v._id}>
                            <Item
                                extra={<img src={avatar}/>}
                                className='chat-me'
                            >send: {v.content}</Item>
                        </List>
                    )


                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="Message"
                            onChange={(v)=>{
                                this.setState({text:v})
                            }}
                            value={this.state.text}
                            extra={<span onClick={()=>this.handleSubmit()}>Send</span>}
                        ></InputItem>
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat