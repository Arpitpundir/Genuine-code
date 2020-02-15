import React, {Component} from "react"
import {axiosInstance} from "./../../../hocs/AxiosInstance"
import CenterFlexbox from "./../../Flexbox/centerFlexbox"
import SecHeader from "./../../secHeader/secHeader"
import Spinner from "./../../UI/Spinner/spinner"
import NoData from "./../../UI/noData/noData"
import PrdTable from "./../PrdTable/PrdTable"
import AuthContext from "./../../../context/authContext"
import {Link} from "react-router-dom"
import Button from "./../../UI/Button/button"

export default class PrdTableCont extends Component{
  constructor(props){
    super(props)
    this.state = {
      products: null
    }
  }
  static contextType = AuthContext
  componentDidMount(){
    axiosInstance({
      method: "GET",
      url: `http://127.0.0.1:9000/api/v1/manf/${this.context.manfId}/catg/${this.props.location.state.catgId}/product`,
      withCredentials: true 
    }).then(res => {
      this.setState({
        products: res.data.products
      })
    })
  }
  render(){
    let products
    if(this.state.products){
      if(this.state.products.length == 0){
        products = (<NoData>Oops...! No Products Found.</NoData>)
      }else{
        products = (<PrdTable products = {this.state.products} match = {this.props.match} location = {this.props.location}/>)
      }
    }else{
      products = (<Spinner/>)
    }
    return(
      <CenterFlexbox>
        <SecHeader>
          <div style = {{"text-transform":"capitalize"}}>
            {this.props.location.state.catgName}
          </div>
          <div>
            <Link to = {{pathname:`${this.props.match.url}/new`,
          state: {
            catgId: this.props.location.state.catgId
          }}}>
              <Button classes = {["Button--6"]}>Add New +</Button>
            </Link>
          </div>
        </SecHeader>
        {products}
      </CenterFlexbox>
    )
  }
}