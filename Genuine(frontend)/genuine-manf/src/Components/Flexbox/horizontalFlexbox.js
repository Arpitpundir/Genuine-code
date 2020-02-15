import React from "react"
import styles from "./horizontalFlexbox.module.scss"

const horizontalFlexbox = (props)=>{
  return(
    <div className = {styles.HorizontalFlexbox}>
      {props.children}
    </div>
  )
}
export default horizontalFlexbox