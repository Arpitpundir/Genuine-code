import React from "react"
import styles from "./date.module.scss"

const DateComponent = (props)=>{
  let date = new Date()
  date = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()
  return(
    <div className = {styles.Date}>
      Date: {date}
    </div>
  )
}

export default DateComponent