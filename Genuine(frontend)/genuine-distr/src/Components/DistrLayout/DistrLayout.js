import React, {Component} from "react"
import styles from "./DistrLayout.module.scss"
import Toolbar from "./../Toolbar/Toolbar"
import Sidebar from "./../Sidebar/Sidebar"
class DistrLayout extends Component{
  constructor(props){
    super(props)
    this.state = {
      auth:{
        status: false,
        data: null
      }
    }
  }
  render(){
    return(
      <div className = {styles.DistrLayout}>
        <Toolbar/>
        <Sidebar auth = {this.state.auth}/>
        <main className = {styles.main}>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default DistrLayout