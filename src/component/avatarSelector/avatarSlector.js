import React from 'react'
import {Grid, List} from  'antd-mobile'
import  PropTypes from 'prop-types'

class AvatarSlector extends React.Component{
    static propTypes = {
        selectAvatar : PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        const avatarList = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15'
            .split(',')
            .map(v=>({
                icon: require('../img/'+v+".jpg"),
                text:v
            }))
        const gridHeader = this.state.text?
            (<div><span>Selected Avatar</span>
                <img src={this.state.icon} style={{width:10}}/>
            </div>)
            :<div>Please Select Avatar</div>

        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid data={avatarList}
                          columnNum={5}
                          onClick={elm=>{
                              this.props.selectAvatar(elm.text)
                              this.setState(elm)
                          }}
                    />
                </List>
            </div>
        )
    }
}

export default AvatarSlector