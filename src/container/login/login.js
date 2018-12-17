import React from 'react'
import Logo from '../../component/logo/logo'
import {List,Button,WingBlank,WhiteSpace,InputItem} from 'antd-mobile'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
    state=>{return state.user},
    {login}
)
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:'',
            pwd:''
        }

        this.handleLogin = this.handleLogin.bind(this)
        this.register = this.register.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    register(){
        this.props.history.push('/register')
    }
    handleChange(key,value){
        this.setState({
            [key]:value
        })
    }
    handleLogin(){
        this.props.login(this.state)
    }

    render (){
        return (
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo}/>:null}
                <Logo/>
                <h1>Login Page</h1>
                <WingBlank>
                    {this.props.msg? <p className='err-msg'>{this.props.msg}</p>:null}
                    <InputItem type="text" placeholder="Username"
                        onChange={v=>{this.handleChange('user',v)}}
                    />
                    <WhiteSpace/>
                    <InputItem type="password" placeholder="Password"
                               onChange={v=>{this.handleChange('pwd',v)}}
                    />
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleLogin}>Login</Button>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.register}>Register</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login