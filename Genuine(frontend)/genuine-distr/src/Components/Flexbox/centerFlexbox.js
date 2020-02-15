import React from "react"
import styles from "./centerFlexbox.module.scss"

const CenterFlexbox = (props)=>{
  return(
    <div className = {styles.CenterFlexbox}>
      {props.children}
    </div>
  )
}

export default CenterFlexbox