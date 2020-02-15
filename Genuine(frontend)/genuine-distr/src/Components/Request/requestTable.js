import React from "react"
import CustomTable from "./../Table/CustomTable"
export default (props) =>{
  let keys = ["S.No", "Name", "Email","Phone", "Address", "Id"]
  let rows = []
  props.manfs.forEach((manf, index) => {
    let row = {}
    row.sNo = index+1
    row.name = manf.name
    row.email = manf.email
    row.phoneNo = manf.phNo
    row.address = manf.address
    row.link = {
      path: `/${manf._id}`,
      data:{
        _id: manf._id,
        manf: manf
      }
    }
    rows.push(row)
  });
  return (<CustomTable data = {rows} keys = {keys} match = {props.match}/>)
}