import React, {Component} from "react"
import {axiosInstance} from "./../../hocs/AxiosInstance"
import AuthContext from "../../context/authContext"
import ManfTable from "./manfTable"
import NoData from "./../UI/noData/noData"
import Spinner from "./../UI/Spinner/spinner"
import CenterFlexbox from "./../Flexbox/centerFlexbox"
import SecHeader from "./../secHeader/secHeader"
import VertFlexbox from "../Flexbox/vertFlexbox"

export default class ManfListCont extends Component{
  constructor(props){
    super(props)
    this.state = {
        manfs: null
      }
  }
  static contextType = AuthContext
  componentDidMount(){
    axiosInstance({
      url: `distr/${this.context.distrId}/manfs`,
      method: "GET",
      withCredentials: true
    }).then(res => {
      console.log(res.data.manfs)
      this.setState({
        manfs: res.data.manfs
      })
    })
  }
  render(){
    if(this.state.manfs){
      if(this.state.manfs.length == 0){
        return NoData
      }
      return(
        <CenterFlexbox>
          <SecHeader>
            <div>
              Manufacturers
            </div>
          </SecHeader>
          <VertFlexbox>
            <ManfTable manfs = {this.state.manfs} match = {this.props.match}/>
          </VertFlexbox>
        </CenterFlexbox>
      )
    }
    return <Spinner/>
  }
}