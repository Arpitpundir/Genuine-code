import React from "react"
import styles from "./noData.module.scss"

export default (props) => {
  return(
  <div className = {styles.NoData}>{props.children}</div>
  )
}