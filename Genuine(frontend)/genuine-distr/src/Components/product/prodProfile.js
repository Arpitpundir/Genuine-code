import React from "react"
import Profile from "../Profile/profile"
import Aux from "../../hocs/Aux"
import VertFlexbox from "../Flexbox/vertFlexbox"
import SecHeader from "./../secHeader/secHeader"
export default (props) => {
  return(
    <VertFlexbox>
      <SecHeader>
        <div>Product Info</div>
      </SecHeader>
      <Profile
        catg = {props.profileInfo.category?props.profileInfo.category : null}
        id = {props.profileInfo._id}
        productName = {props.profileInfo.name}
        price = {props.profileInfo.price}
        logo={"/pumaLogo/puma1.png"}
      />
    </VertFlexbox>
  )
} 