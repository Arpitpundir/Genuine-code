import React, {Component} from 'react';
import DistrLayout from "./Components/DistrLayout/DistrLayout"
import AuthContext from "./context/authContext"
import {Route, Redirect} from "react-router-dom"
import Auth from "./Components/auth/auth"
import Aux from "./hocs/Aux"
import SignupForm from "./Components/FormsContainer/DistrSignupFormContainer"
import LoginForm from "./Components/FormsContainer/DistrLoginFormContainer"
import Profile from "./Components/Profile/profileCont"
import Cookies from 'js-cookie';
import axios from "axios"
import ProfileCont from "./Components/Profile/profileCont"
import RequestCont from "./Components/Request/requestCont"
import ManfCont from "./Components/manf/manfCont"
import ProdCont from "./Components/product/productCont"
import ManfList from "./Components/ManfList/manfListCont"
class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      isAuthenticated: false,
      distrId: null,
      token: null,
      formType: "login"
    }
  }

  componentDidMount(){
    axios({
      method: "GET",
      url: "http://127.0.0.1:9000/api/v1/distr/state",
      withCredentials: true
    }).then(res => {
      if(res.data.state){
        this.setState({
          isAuthenticated: true,
          distrId: res.data.id,
          token: res.data.token
        })
      }else{
        this.setState({
          isAuthenticated: false,
          distrId: null,
          token: null
        })
      }
    }).catch(error => {
      console.log(error)
    })
  }

  authHandler = (newState)=>{
    this.setState({
      ...newState
    })
    console.log(this.state)
  }
  formTypeChangeHandler = (value)=>{
    this.setState({
      formType: value
    })
  }
  render(){
    let routes
    if(this.state.isAuthenticated){
      routes = (
        <Aux>
          <Route exact path = {"/distr/:distrId"} component = {ProfileCont}></Route>
          <Route  path = {`/distr/:distrId/requests`} component = {RequestCont}></Route>
          <Route exact path = {`/distr/:distrId/partners`} component = {ManfList}></Route>
          <Route exact path = {`/distr/:distrId/partners/:partnerId`} component = {ManfCont}></Route>
      <Route exact path = {`/distr/:distrId/partners/:partnerId/products/:productId`} render={props => <ProdCont key={Date.now()} {...props}/>}></Route>
          <Redirect to = {"/distr/:distrid"}></Redirect>
        </Aux>
      )}else{
        routes = (<Aux>
          <Route path = "/login" component = {LoginForm}></Route>
          <Route path = "/signup" component = {SignupForm}></Route>
          <Redirect to = "/signup"></Redirect>
        </Aux>)
      }
    return(
      <AuthContext.Provider value = {{
        isAuthenticated: this.state.isAuthenticated,
        distrId: this.state.distrId,
        token: this.state.token,
        formType: this.state.formType,
        authHandler: this.authHandler
        }}>
        <DistrLayout>
          {routes}
        </DistrLayout>
      </AuthContext.Provider>
    )
  }
}

export default App;
