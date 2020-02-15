import React from "react"
import CustomTable from "./../Table/CustomTable"
export default (props) => {
  let rows = []
  let keys = [
    "Label Requests",
    "Id",
    "Manufacturer",
    "Phone No",
  ]
  props.manfs.forEach(manf => {
    let row = {}
    row.labelReq = manf.newLabelReq
    row.link = {
      path: `/${manf.profile._id}`,
      data:{
        _id: manf.profile._id,
        manfId: manf.profile._id
      }
    }
    row.name = manf.profile.name
    row.phNo = manf.profile.phNo
    rows.push(row)
  })
  return <CustomTable keys = {keys} data = {rows} match = {props.match}/>
}