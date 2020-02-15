import React from "react"
import styles from "./vertFlexbox.module.scss"

const VertFlexbox = (props)=>{
  return(
    <div className = {styles.VertFlexbox}>
      {props.children}
    </div>
  )
}
export default VertFlexbox