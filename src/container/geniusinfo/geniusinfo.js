import React from 'react'
import {NavBar, InputItem, TextareaItem, Button, WingBlank} from 'antd-mobile'
import AvatarSelector from '../../component/avatarSelector/avatarSlector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(state=>state.user,{update})
class GeniusInfo extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            title : '',
            companyName :'',
            salary : '',
            desc: '',
            avatar:''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (k,v){
        this.setState({
            [k]:v
        })
    }

    render(){
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (


            <div>
                {redirect&& redirect!==path? <Redirect to={this.props.redirectTo}/>:null}
                <NavBar mode="dark">Boss Information</NavBar>
                <WingBlank>

                    <AvatarSelector selectAvatar={(elm)=>{this.setState({avatar:elm})}}></AvatarSelector>
                    <InputItem type="text" placeholder="Position" onChange={v=>{this.handleChange('title',v)}}/>
                    <TextareaItem
                        onChange={v=>{this.handleChange('desc',v)}}
                        rows={3}
                        autoHeight
                        placeholder="Personal Description"
                    />

                    <Button type='primary' onClick={()=>{this.props.update(this.state)}}>Save</Button>
                </WingBlank>

            </div>
        )
    }
}

export  default GeniusInfo