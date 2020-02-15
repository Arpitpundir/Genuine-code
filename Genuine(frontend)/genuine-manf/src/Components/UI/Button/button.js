import React from "react"
import styles from "./button.module.scss"

const Button = (props)=>{
  let classes = [styles.Button]
  props.classes.forEach(element => {
    classes.push(styles[element])
  });
  return(
    
      <button className = {classes.join(" ")} onClick = {props.clicked}>{props.children}</button>
    
  )
}
export default Button