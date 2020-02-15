import React from "react"
import CustomTable from "./../Table/CustomTable"
import styles from "./labelTable.module.scss"
import VertFlexbox from "./../Flexbox/vertFlexbox"
import SecHeader from "./../secHeader/secHeader"

export default (props) => {
  return(
    <VertFlexbox>
      <SecHeader classes = {["GreyHeader"]}>
        <div>
          Label Request History
        </div>
      </SecHeader>
    <div className = {styles.LabelTable}>
      <CustomTable keys = {props.labelTableKeys} data = {props.labelTableData}>
      </CustomTable>
    </div>
    </VertFlexbox>
  )
}
