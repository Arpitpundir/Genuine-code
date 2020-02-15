import React from "react"
import CustomTable from "./../Table/CustomTable"
export default (props) =>{
  let keys = ["S.No", "Name", "Added Date", "Price", "Id"]
  let rows = []
  props.distrs.forEach((distr, index) => {
    let row = {}
    row.sNo = index+1
    row.name = distr.name
    row.email = distr.email
    row.phoneNo = distr.phNo
    row.link = {
      path: `/${distr._id}`,
      data:{
        _id: distr._id,
        distr: distr
      }
    }
    rows.push(row)
  });
  return (<CustomTable data = {rows} keys = {keys} match = {props.match}/>)
}