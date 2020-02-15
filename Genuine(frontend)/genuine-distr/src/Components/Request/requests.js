import React, {Component} from "react"
import styles from "./requests.module.scss"
import AuthContext from "./../../context/authContext"
import axios from "axios"
import ReqTable from "./requestTable"
import SecHeader from "./../secHeader/secHeader"
import CenterFlexbox from "./../Flexbox/centerFlexbox"
import Spinner from "./../UI/Spinner/spinner"
import NoData from "./../UI/noData/noData"
import VertFlexbox from "./../Flexbox/vertFlexbox"

export default class Requests extends Component{
  constructor(props) {
    super(props);
    this.state = {
      requests: null
    };
  }

  static contextType = AuthContext;

  componentDidMount() {
    axios({
      url: "http://127.0.0.1:9000/api/v1/distr/"+this.context.distrId+"/requests/",
      method: "GET",
      withCredentials: true
    })
      .then(res =>
        this.setState({
          requests: res.data.item.requests
        })
      )
      .catch(error => {
        console.log(error);
      });
  }
  render(){
    if(this.state.requests){
      if(this.state.requests.length == 0){
        return <NoData/>
      }
      return(
        <CenterFlexbox>
          <SecHeader>
            <div>
              Your New Business Requests from Manufacturers
            </div>
          </SecHeader>
          <VertFlexbox>
            <ReqTable manfs = {this.state.requests} match = {this.props.match}></ReqTable>
          </VertFlexbox>
        </CenterFlexbox>
      )
    }
    return <Spinner/>
  }
}
