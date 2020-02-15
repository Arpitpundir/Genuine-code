import React, {Component} from "react"
import styles from "./ManfLayout.module.scss"
import Toolbar from "./../Toolbar/Toolbar"
import Sidebar from "./../Sidebar/Sidebar"
class ManfLayout extends Component{
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
      <div className = {styles.ManfLayout}>
        <Toolbar/>
        <Sidebar auth = {this.state.auth}/>
        <main className = {styles.main}>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default ManfLayout