import React, {Component} from 'react';
import ManfLayout from "./Components/ManfLayout/ManfLayout"
import AuthContext from "./context/authContext"
import {Route, Redirect, Switch} from "react-router-dom"
import Aux from "./hocs/Aux"
import SignupForm from "./Components/FormsContainer/ManfSignupFormContainer"
import LoginForm from "./Components/FormsContainer/ManfLoginFormContainer"
import axios from "axios"
import ProfileCont from "./Components/Profile/profileCont"
import CatgCont from './Components/Catg/CatgCont';
import CreateCatgForm from "./Components/FormsContainer/CatgForm"
import ProductTable from "./Components/Catg/PrdTable/PrdTableCont"
import ProductForm from "./Components/FormsContainer/PrdForm"
import ProductCont from "./Components/Product/prodCont"
import DistrTableCont from "./Components/Distr/DistrTableCont"
import DistrProfileCont from "./Components/Distr/DistrProfileCont"

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      isAuthenticated: false,
      manfId: null,
      token: null,
      formType: "login"
    }
  }

  componentDidMount(){
    axios({
      method: "GET",
      url: "http://127.0.0.1:9000/api/v1/manf/state",
      withCredentials: true
    }).then(res => {
      if(res.data.state){
        this.setState({
          isAuthenticated: true,
          manfId: res.data.id,
          token: res.data.token
        })
      }else{
        this.setState({
          isAuthenticated: false,
          manfId: null,
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
      console.log(this.context)
      routes = (
        <Aux>
          <Switch>
            <Route exact path = {"/manf/:manfId"} component = {ProfileCont}></Route>
            <Route exact path = {"/manf/:manfId/distr/:distrId"} component = {DistrProfileCont}/>
            <Route exact path = {"/manf/:manfId/catg"} component = {CatgCont}/>
            <Route exact path = {"/manf/:manfId/catg/new"} component = {CreateCatgForm}/>
            <Route exact path = {"/manf/:manfId/catg/:catgId/product"} component = {ProductTable}/>
            <Route exact path = {"/manf/:manfId/catg/:catgId/product/new"} component = {ProductForm}/>
            <Route exact path = {"/manf/:manfId/catg/:catgId/product/:prdId"} component = {ProductCont}/>
            <Route exact path = {"/manf/:manfId/distr"} component = {DistrTableCont}></Route>
            <Redirect to = {`/manf/${this.state.manfId}`}/>
          </Switch>
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
        manfId: this.state.manfId,
        token: this.state.token,
        formType: this.state.formType,
        authHandler: this.authHandler
        }}>
        <ManfLayout>

          {routes}
        </ManfLayout>
      </AuthContext.Provider>
    )
  }
}

export default App;
