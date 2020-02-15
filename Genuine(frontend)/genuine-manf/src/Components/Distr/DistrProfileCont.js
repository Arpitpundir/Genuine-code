import React, { Component } from "react";
import Profile from "../Profile/profile";
import SecHeader from "../secHeader/secHeader";
import Button from "../UI/Button/button";
import CenterFlexbox from "../Flexbox/centerFlexbox";
import VertFlexbox from "../Flexbox/vertFlexbox";
import { axiosInstance } from "./../../hocs/AxiosInstance";
import AuthContext from "./../../context/authContext";
import { Redirect } from "react-router-dom";

export default class DistrProfileCont extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      distr: this.props.location.state.data.distr,
      status: null
    };
  }
  static contextType = AuthContext;
  componentDidMount() {
    axiosInstance({
      method: "GET",
      url: `http://127.0.0.1:9000/api/v1/manf/${this.context.manfId}/request`,
      withCredentials: true
    })
      .then(res => {
        console.log(res.data);
        this.checkStatusReq(res.data.docs.requests);
      })
      .then(() => {
        if (this.state.status != "Requested") {
          axiosInstance({
            method: "GET",
            url: `http://127.0.0.1:9000/api/v1/manf/${this.context.manfId}/distr/my`,
            withCredentials: true
          }).then(res => {
            console.log(res.data);
            this.checkStatus(res.data.docs.distr);
            this.setState({
              distrs: res.data.docs.distr
            });
          });
        }
      });
  }

  checkStatusReq(requests) {
    const distr = requests.find(req => req._id == this.state.distr._id);
    if (distr == undefined) {
      this.setState({
        status: "NotRequested"
      });
    } else {
      this.setState({
        status: "Requested"
      });
    }
  }

  checkStatus(distrs) {
    const distr = distrs.find(distr => distr._id == this.state.distr._id);
    if (distr == undefined) {
      this.setState({
        status: "NotAPartner"
      });
    } else {
      this.setState({
        status: "Partner"
      });
    }
  }
  submitHandler(event) {
    event.preventDefault();
    axiosInstance({
      method: "POST",
      url: `http://127.0.0.1:9000/api/v1/manf/${this.context.manfId}/request`,
      data: this.state.distr,
      withCredentials: true
    }).then(res => {
      console.log(res.data);
      this.setState({
        redirect: true
      });
    });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={`/manf/${this.context.manfId}/distr`} />;
    }
    console.log(this.state.status);
    let header;
    if (this.state.status) {
      if (this.state.status == "NotAPartner") {
        header = (
          <SecHeader>
            <div>Manufacturer - {this.state.distr.name}</div>
            <div>
              <Button
                classes={["Button--6"]}
                clicked={e => this.submitHandler(e)}
              >
                Send Request
              </Button>
            </div>
          </SecHeader>
        );
      } else if (this.state.status == "Partner") {
        header = (
          <SecHeader>
            <div>Manufacturer(Partner) - {this.state.distr.name}</div>
          </SecHeader>
        );
      } else {
        header = (
          <SecHeader>
            <div>Manufacturer(Requested) - {this.state.distr.name}</div>
          </SecHeader>
        );
      }
    }
    return (
      <CenterFlexbox>
        {header}
        <VertFlexbox>
          <Profile
            name={this.state.distr.name}
            mail={this.state.distr.email}
            phNo={this.state.distr.phNo}
            address={this.state.distr.address}
            logo={"/pumaLogo/puma1.png"}
            id={this.state.distr._id}
          />
        </VertFlexbox>
      </CenterFlexbox>
    );
  }
}
