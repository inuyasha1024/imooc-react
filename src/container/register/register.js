import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button,Radio} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from "../../redux/user.redux";
import {Redirect} from 'react-router-dom'

@connect(
    state=>{return state.user},
    {register}
)
class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user : "",
            pwd : "",
            repeatpwd : "",
            type : 'Genuis'
        }
        this.login = this.login.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }
    login(){
        this.props.history.push('/login')
    }

    handleChange(key,value){
        this.setState({
            [key] : value
        })
    }

    handleRegister(){
        this.props.register(this.state)
        //console.log(this.state)
    }

    render (){
        const RadioItem = Radio.RadioItem
        return (
            <div>

                {this.props.redirectTo? <Redirect to={this.props.redirectTo}/>:null}
                <Logo/>
                <h1>Register Page</h1>
                <p className='err-msg'>{this.props.msg?this.props.msg:null}</p>
                <WingBlank>
                    <InputItem type="text" placeholder="Username"
                        onChange={ v=>this.handleChange('user',v) }
                    />
                    <WhiteSpace/>
                    <InputItem type="password" placeholder="Password"
                       onChange={ v=>this.handleChange('pwd',v) }
                    />
                    <WhiteSpace/>
                    <InputItem type="password" placeholder="Retype Password"
                       onChange={ v=>this.handleChange('repeatpwd',v) }
                    />
                    <WhiteSpace/>
                    <RadioItem checked={this.state.type=='genius'}
                        onChange={()=>this.handleChange('type','genius')}
                    >Genuis</RadioItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.state.type=='boss'}
                       onChange={()=>this.handleChange('type','boss')}
                    >BOSS</RadioItem>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.handleRegister}>Register</Button>
                    <WhiteSpace/>
                    <Button onClick={this.login} type='primary'>Login</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register