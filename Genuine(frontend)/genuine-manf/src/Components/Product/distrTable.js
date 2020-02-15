import React from "react"
import Table from "../Table/Table"
import styles from './distrTable.module.scss'

export default (props) => {
  console.log(props)
  let table = null
  if(props.distrs == null || props.distrs.length == 0){
    table = (<p>No distrs to show</p>)
  }else{
    console.log("klkl")
    let profiles = [] 
    props.distrs.forEach(distr => {
      delete distr.profile.price
      delete distr.profile.category
      distr.profile.link = {
        path:`/distrs/${distr.profile._id}`,
        link: distr.profile._id,
        data:{
          distrId: distr.profile._id
        }
      }
      delete distr.profile._id
      profiles.push(distr.profile)
      table = <Table data = {profiles} match = {props.match}></Table>
    })
  }
  return table
}
