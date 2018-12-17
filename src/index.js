/*
import {createStore} from 'redux'

//新建store
//通过reducer建立
//根据老的state和action 生成新的state
function counter(state=0,action) {
    switch (action.type){
        case 'add gun':
            return state+1
        case 'remove gun':
            return state-1
        default:
            return 10
    }
}

//新建store
const store = createStore(counter)
const init = store.getState()
console.log(init)
function listener(){
    const  current = store.getState()
    console.log('now have gun '+current)
}
store.subscribe(listener)
//派发事件
store.dispatch({
    type: 'add gun'
})
store.dispatch({
    type: 'add gun'
})
store.dispatch({
    type: 'remove gun'
})
*/
/*
import {createStore} from 'redux'
import {counter, addGun, removeGun} from  './index.redux'


const store = createStore(counter)
console.log(store.getState())

function listener() {
    console.log("now have gun"+store.getState())
}
store.subscribe(listener)

store.dispatch(addGun())
store.dispatch(removeGun())
store.dispatch(removeGun())*/

import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware,compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import combineReducers from './reducer'
import './config'
import Register from "./container/register/register";
import Login from './container/login/login.js'
import AuthRoute from './component/authroute/authRoute'
import BossInfo from './container/bossinfo/boosinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from "./component/dashboard/dashboard";
import Chat from './component/chat/chat'


const reduxDevtools = window.devToolsExtension?window.devToolsExtension():()=>{}
var store = createStore(combineReducers,compose(
    applyMiddleware(thunk),
    reduxDevtools
))

/*class Test extends React.Component{
    render(){
        return <h2>测试 {this.props.match.params.location}</h2>
    }
}*/
function Boss() {
    return <h2>BOSS</h2>
}

function render() {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <AuthRoute/>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path='/bossinfo' component={BossInfo}/>
                        <Route path="/geniusinfo" component={GeniusInfo}/>
                        <Route path="/chat/:user" component={Chat}/>
                        <Route component={Dashboard}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root'))
}
render()
store.subscribe(render)