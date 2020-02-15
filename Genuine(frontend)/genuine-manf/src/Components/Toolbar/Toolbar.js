import React, {useContext, Component} from "react"
import styles from "./Toolbar.module.scss"
import Button from "./../UI/Button/button"
import AuthContext from "./../../context/authContext"
import {Link} from "react-router-dom"
import axios from "axios"

class Toolbar extends Component{
  constructor(props){
    super(props)
    this.logOutHandler = this.logOutHandler.bind(this)
  }
  static contextType = AuthContext
  logOutHandler(){
    axios({
      method: "POST",
      url: "http://127.0.0.1:9000/api/v1/distr/logout",
      withCredentials: true
    }).then(res => {
      this.context.authHandler({
        isAuthenticated: false,
        distrId: null,
        token: null
      })
    })
  }
  render(){
    if(!this.context.isAuthenticated){
      return(
        <div className = {styles.Toolbar}>
          <Link exact to = "/signup">
            <Button classes = {["Button--2"]}>Signup</Button>
          </Link>
          <Link exact to = "/login">
            <Button classes = {["Button--2"]}>Login</Button>
          </Link>
        </div>
      )
    }
    return(
      <div className={styles.Toolbar}>
          <Button
            classes={["Button--2"]}
            clicked = {this.logOutHandler}>
            Logout
          </Button>
      </div>
    );
  }
}

export default Toolbar