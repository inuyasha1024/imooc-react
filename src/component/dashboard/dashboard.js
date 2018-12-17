import React from 'react'
import {NavBar} from 'antd-mobile'
import {connect} from 'react-redux'
import  NavLinkBar from '../../component/navlink/navlink'
import {Switch, Route} from 'react-router-dom'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import {getMsgList,recvMsg} from "../../redux/chat.redux";

function Msg() {
    return <h2>Msg Page</h2>
}



@connect( state=>state,{getMsgList,recvMsg})
class Dashboard extends  React.Component{
    constructor(props){
        super(props)

    }
    componentDidMount(){
        this.props.getMsgList()
        this.props.recvMsg()
    }
    render(){
        //const user = this.props.user
        const props = this.props
        ///console.log(user)
        const pathname = props.location.pathname

        const navList = [
            {
                path: '/boss',
                test: 'genius',
                icon: 'boss',
                title: 'Genius List',
                component: Boss,
                hide:props.user.type == 'genius'
            },
            {
                path: '/genius',
                test: 'boss',
                icon: 'job',
                title: 'Boss List',
                component: Genius,
                hide:props.user.type == 'boss'
            },
            {
                path: '/msg',
                test: 'massage',
                icon: 'msg',
                title: 'Message List',
                component: Msg,
            },
            {
                path: '/me',
                test: 'me',
                icon: 'user',
                title: 'User Center',
                component: User,
            }
        ]



        return(
            <div>
                <NavBar mode='dark' className='fixed-header'>{navList.find(v=>v.path==pathname).title}</NavBar>
                <div>
                    <Switch>
                        {navList.map(v=>{
                            return <Route key={v.path} path={v.path} component={v.component}/>
                        })}
                    </Switch>
                </div>

                <NavLinkBar data={navList}/>
            </div>
        )
    }
}

export default Dashboard