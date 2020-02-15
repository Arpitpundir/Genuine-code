import React, { Component } from "react";
import AuthContext from "./../../context/authContext";
import axios from "axios";
import { Route, Redirect } from "react-router-dom";
import Aux from "./../../hocs/Aux";
import Requests from "./../Request/requests";
import Request from "./../Request/request";
import { axiosInstance } from "./../../hocs/AxiosInstance";
export default class RequestCont extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      manfId: null
    };
  }
  static contextType = AuthContext;

  acceptHandler = data => {
    const url = "distr/" + this.context.distrId + "/partners";
    console.log(url);
    axiosInstance({
      url: url,
      method: "POST",
      data: data,
      withCredentials: true
    })
      .then(res => {
        return axiosInstance({
          method: "DELETE",
          url: `distr/${this.context.distrId}/requests`,
          params: {
            manfId: data._id
          },
          withCredentials: true
        });
      })
      .then(res => {
        this.setState({
          status: "Accept",
          manfId: data._id
        });
        //console.log("Req Accepted and Deleted successfully");
      })
      .catch(error => {
        console.log(error);
      });
  };
  declineHandler = async data => {
    axiosInstance({
      method: "DELETE",
      url: `distr/${this.context.distrId}/requests`,
      params: {
        manfId: data._id
      },
      withCredentials: true
    })
      .then(res => {
        this.setState({
          status: "Declined",
          manfId: null
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    console.log(this.props.match.path, this.state.status)
    if (this.state.status == "Accept") {
      return (
        <Redirect
          to={{
            pathname: `/distr/${this.context.distrId}/partners/${this.state.manfId}`,
            state: {
              data:{
                manfId: this.state.manfId
              }
            }
          }}
        ></Redirect>
      );
    } else if (this.state.status == "Declined") {
      this.setState({
        status: null,
        manfId: null
      })
      return(
         <Redirect
         to={`${this.props.match.url}`}
       ></Redirect>
      )
    }
    return (
      <Aux>
        <Route
          exact
          path={`${this.props.match.path}`}
          render = {(props) => <Requests {...props}></Requests>}
        ></Route>
        <Route
          exact
          path={`${this.props.match.path}/:manfId`}
          render={props => (
            <Request
              {...props}
              acceptHandler={this.acceptHandler}
              declineHandler={this.declineHandler}
            ></Request>
          )}
        ></Route>
      </Aux>
    );
  }
}
