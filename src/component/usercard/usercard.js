import React from 'react'
import PropTypes from 'prop-types'
import {WhiteSpace,WingBlank,Card} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.Component{
    static propTypes = {
        userList : PropTypes.array.isRequired
    }

    handleClick(v){
        this.props.history.push('/chat/'+v._id)
    }

    render(){
        return(
            <div>
                <WhiteSpace/>
                <WingBlank>
                    {this.props.userList.map(v=>{
                        return(
                            v.avatar?<Card key={v._id}
                                onClick={()=>this.handleClick(v)}
                            >
                                <Card.Header

                                    title={v.user}
                                    thumb={require('../img/'+v.avatar+'.jpg')}
                                    extra={<span>{v.title}</span>}
                                >

                                </Card.Header>
                                <Card.Body>
                                    {v.type=='boss'? <div>Company:{v.companyName}</div> :null}
                                    {v.desc.split('\n').map(d=>(
                                        <div>{d}</div>
                                    ))}
                                    {v.type=='boss'? <div>Salary:{v.salary}</div> :null}
                                </Card.Body>
                            </Card>:null
                        )
                    })}
                </WingBlank>
            </div>
        )
    }
}

export default UserCard