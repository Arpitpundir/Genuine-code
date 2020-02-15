import React, {Component} from "react"
import {axiosInstance} from "../../hocs/AxiosInstance"
import DistrTable from "./DistrTable"
import Spinner from "../UI/Spinner/spinner"

export default class DistrCont extends Component{
  constructor(props){
    super(props)
    this.state = {
      distrs: null
    }
  }

  componentDidMount(){
    axiosInstance({
      method: "GET",
      url: `http://127.0.0.1:9000/api/v1/manf/${this.context.manfId}/distr`,
      withCredentials: true 
    }).then(res => {
      console.log(res.data)
      this.setState({
        distrs: res.data.docs
      })
    })
  }
  render(){
    if(this.state.distrs){
      return <DistrTable distrs = {this.state.distrs} match = {this.props.match} location = {this.props.location}/>
    }else{
      return <Spinner/>
    }
  }
}
