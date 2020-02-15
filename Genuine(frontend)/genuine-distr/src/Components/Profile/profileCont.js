import React, {Component} from "react"
import AuthContext from "./../../context/authContext"
import Profile from "./profile"
import axios from "axios"
import CenterFlexbox from "./../Flexbox/centerFlexbox"
import SecHeader from "./../secHeader/secHeader"
import Button from "./../UI/Button/button"
import VertFlexbox from "./../Flexbox/vertFlexbox"

class ProfileCont extends Component{
  constructor(props){
    super(props);
    this.state = {
      profileData: null
    }
  }
  static contextType = AuthContext
  componentDidMount(){
    console.log(this.context)

    axios({
      url: 'http://127.0.0.1:9000/api/v1/distr/'+ this.context.distrId,
      method: "GET",
      withCredentials: true      //params: {
      //  id: this.context.distrId
      //}
    }).then(res => {
        this.setState({
          profileData: res.data.item
        })
    })
  }

  render(){
    console.log(document.cookie)
    if(this.state.profileData){
      return(
        <CenterFlexbox>
        <SecHeader>
          <div> Profile Details </div>
          <div>
          <Button classes = {
              ["Button--3"]
            }> Edit </Button> 
          </div>
        </SecHeader>
        <VertFlexbox>
          <Profile companyName = {this.state.profileData.name}
            mail = {this.state.profileData.email}
            phNo = {this.state.profileData.phNo}
            address = {this.state.profileData.address}
            logo = "/flipkartLogo/flipkart1.jpg"
            id = {this.state.profileData._id}/>
        </VertFlexbox>
      </CenterFlexbox>
      )
    }
    return(
      null
    )
  }
}

export default ProfileCont