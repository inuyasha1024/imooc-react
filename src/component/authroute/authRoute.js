import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {loadData} from '../../redux/user.redux'

@withRouter
@connect(state=>state.user,{loadData})
class  AuthRoute extends React.Component{
    componentDidMount(){
        const publicList = ['/login','/register']
        const  pathname = this.props.location.pathname
        if(publicList.indexOf(pathname) >-1){
            return null
        }
/*        if (this.props.isAuth){

        } else {
            this.props.history.push('/login')
        }*/
       axios.get('/user/info')
            .then(res=>{
                if (res.status==200){
                    if(res.data.code ==0){
                        this.props.loadData(res.data.data)
                    }else {
                        //console.log(this.props.history)
                        this.props.history.push('/login')
                    }
                }
            })
    }
    render(){
        return null
    }
}

export default AuthRoute