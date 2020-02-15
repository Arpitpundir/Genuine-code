import React from "react"
import Profile from "./../Profile/profile"
import SecHeader from "./../secHeader/secHeader"
import Aux from "./../../hocs/Aux"
import Button from "./../UI/Button/button"
import styles from "./request.module.scss"
import {axiosInstance} from './../../hocs/AxiosInstance'
import VertFlexbox from "./../Flexbox/vertFlexbox"

export default Request = (props) => {
  const manfData = {
    _id: props.location.state.data.manf._id,
    name: props.location.state.data.manf.name,
    address: props.location.state.data.manf.address,
    email: props.location.state.data.manf.email,
    phNo: props.location.state.data.manf.phNo
  }
  console.log(props)
  return(
    <Aux>
      <SecHeader>
        <div>
          Request From - {manfData.name}
        </div>
        <div className = {styles.buttons}>
          <Button clicked = {() => props.acceptHandler(manfData)} classes = {["Button--3", "Button--4"]}>Accept</Button>
          <Button clicked = {() => props.declineHandler(manfData)} classes = {["Button--3", "Button--5"]}>Decline</Button>
        </div>
      </SecHeader>
      <VertFlexbox>
      <Profile companyName = {props.location.state.data.manf.name}
        mail = {props.location.state.data.manf.email}
        phNo = {props.location.state.data.manf.phNo}
        address = {props.location.state.data.manf.address}
        logo = {"/pumaLogo/puma1.png"}
        id = {props.location.state.data.manf._id}/>
      </VertFlexbox>
    </Aux>
  )
}