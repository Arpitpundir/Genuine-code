import React from "react"
import styles from "./secHeader.module.scss"

const SecHeader = (props)=>{
  let classes = []
  if(props.classes){
    props.classes.forEach(element => {
      classes.push(styles[element])
    });
  }
  classes.push(styles.SecHeader)
  return(
    <div className = {classes.join(" ")}>
      {props.children}
    </div>
  )
}

export default SecHeader