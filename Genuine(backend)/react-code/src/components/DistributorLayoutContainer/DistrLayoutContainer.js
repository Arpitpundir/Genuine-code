import React, {Components} from "react"
import styles from "DistrLayout.module.css"
import Toolbar from "../Toolbar/Toolbar"

class DistrLayout extends Components{
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
      <div className = {styles.DistrLayoutContainer}>
        <Toolbar/>
      </div>
    )
  }
}

export default DistrLayout