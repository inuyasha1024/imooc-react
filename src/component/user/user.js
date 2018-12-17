import React from 'react'
import {connect} from 'react-redux'
import {Result,List,WhiteSpace,Modal} from 'antd-mobile'
import BrowserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(
    state=>state.user,
    {logoutSubmit}
)
class User extends React.Component{
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout(){
        const alert = Modal.alert
        alert('Logout', 'Are you sure???', [
            { text: 'Cancel', onPress: () => console.log('cancel') },
            { text: 'Ok', onPress: () =>{
                    BrowserCookie.erase('userid')
                    this.props.logoutSubmit()
                } },
        ])
    }
    render(){
        const props = this.props
        const Item = List.Item
        const Brief = List.Item.Brief
        return this.props.user? (
            <div>
                <Result
                    img={<img src={require('../img/'+this.props.avatar+".jpg")} style={{width:50}}/>}
                    title={this.props.user}
                    message={this.props.type== 'boss'?this.props.company:null}
                >

                </Result>
                <List  renderHeader={()=>'Introduce'}>
                    <Item
                        multipleLine={true}
                    >{this.props.title}
                    {this.props.desc.split('\n').map(v=>{return (<Brief key={v}>{v}</Brief>)})}
                    {this.props.salary? <Brief>{this.props.salary}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}>Logout</Item>
                </List>
            </div>
        ):<Redirect to={this.props.redirectTo}/>
    }
}

export default User