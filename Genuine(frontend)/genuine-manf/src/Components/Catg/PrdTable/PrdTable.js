import React from "react"
import CustomTable from "./../../Table/CustomTable"

export default (props) => {
  let keys = ["S.No", "Name", "Added Date", "Price", "Id"]
  let rows = []
  props.products.forEach((product, index) => {
    let row = {}
    row.sNo = index+1
    row.name = product.name
    row.sdate = product.manfDate
    row.price = product.price
    row.link = {
      path: `/${product._id}`,
      data:{
        _id: product._id,
        productId: product._id,
        catgId: props.location.state.catgId
      }
    }
    rows.push(row)
  });

  return (<CustomTable data = {rows} keys = {keys} match = {props.match}/>)
}