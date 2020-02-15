import React, {useContext} from "react"
import styles from "./CatgCard.module.scss"
import Image from "./../../Images/helmetCatg/helmet1.png"
import {Link} from "react-router-dom"
import AuthContext from "../../context/authContext"

export default (props) => {
  const authContext = useContext(AuthContext)
  return(
    <Link style = {{"text-decoration":"none",
  "width":"15rem",
"height": "15rem",
"margin": "1rem"}}to = {{pathname:`/manf/${authContext.manfId}/catg/${props.catgId}/product`,
    state:{
      catgName: props.catgName,
      catgId: props.catgId
    }}}>
      <div className = {styles.Card}>
      <div>
        <img src = {Image}/>
      </div>
      <div className = {styles.Card__CatgName}>
        {props.catgName}
      </div>
      <div className = {styles.Card__ProductCount}>
        {props.productCount}
      </div>
      </div>
    </Link>

  )
}