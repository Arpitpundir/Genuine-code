import React from "react"
import Table from "./../Table/Table"
import styles from './prodTable.module.scss'

export default (props) => {
  console.log(props)
  let table = null
  if(props.products == null || props.products.length == 0){
    table = (<p>No products to show</p>)
  }else{
    console.log("klkl")
    let profiles = [] 
    props.products.forEach(product => {
      delete product.profile.price
      delete product.profile.category
      product.profile.link = {
        path:`/products/${product.profile._id}`,
        link: product.profile._id,
        data:{
          productId: product.profile._id,
          manfId: props.profileInfo._id
        }
      }
      delete product.profile._id
      profiles.push(product.profile)
      table = <Table data = {profiles} match = {props.match}></Table>
    })
  }
  return table
}
