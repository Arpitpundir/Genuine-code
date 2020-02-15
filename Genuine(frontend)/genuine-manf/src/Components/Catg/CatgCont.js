import React, {Component} from "react"
import {axiosInstance} from "./../../hocs/AxiosInstance"
import NoData from "./../UI/noData/noData"
import Spinner from "./../UI/Spinner/spinner"
import CenterFlexbox from "./../Flexbox/centerFlexbox"
import SecHeader from "../secHeader/secHeader"
import Button from "./../UI/Button/button"
import {Link} from "react-router-dom"
import VertFlexbox from "../Flexbox/vertFlexbox"
import CatgCards from "./CatgCards"
import AuthContext from "./../../context/authContext"

export default class CatgCont extends Component{
  constructor(props){
    super(props)
    this.state = {
      catg: null
    }
  }
  static contextType = AuthContext
  componentDidMount(){
    axiosInstance({
      method: "GET",
      url: `http://127.0.0.1:9000/api/v1/manf/${this.context.manfId}/catg`,
      withCredentials: true
    }).then(res => {
      //console.log(res.data)
      this.setState({catg: res.data.catg})
    })
  }
  render(){
    let data
    if(this.state.catg){
      if(this.state.catg.length == 0){
        data = (<NoData/>)
      }else{
        data = (<CatgCards catgs = {this.state.catg}/>)
      }
    } else{
      data = (<Spinner/>)
    }
    return(
      <CenterFlexbox>
        <SecHeader>
          <div>
            Product Categories
          </div>
          <div>
            <Link to = {`${this.props.match.url}/new`}>
              <Button classes = {["Button--6"]}>Add New +</Button>
            </Link>
          </div>
        </SecHeader>
          {data}
      </CenterFlexbox>
    )
  }
}
