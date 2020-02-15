import React, { Component } from "react";
import CenterFlexbox from "./../Flexbox/centerFlexbox";
import { axiosInstance } from "./../../hocs/AxiosInstance";
import AuthContext from "./../../context/authContext";
import VertFlexbox from "./../Flexbox/vertFlexbox";
import ProdProfile from "./prodProfile";
import SecHeader from "./../secHeader/secHeader";
import Aux from "./../../hocs/Aux";
import styles from "./prodCont.module.scss";
import LabelTable from "./labelTable";
import Spinner from "./../UI/Spinner/spinner";
import LabelReqForm from "./../FormsContainer/LabelReqForm";

export default class prodCont extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: null,
      labelsInfo: null
    };
  }

  componentDidMount() {
    const tempmanfId = "678";
    axiosInstance({
      url: `/distr/${this.context.distrId}/partners/${this.props.location.state.data.manfId}/products/${this.props.location.state.data.productId}`, //${this.props.location.state.manfId}`,
      method: "GET",
      withCredentials: true
    }).then(res => {
      console.log(res.data.product);
      this.setState({
        profileInfo: res.data.product.profile,
        labelsInfo: res.data.product.labels
      });
    });
  }

  render() {
    return (
      <CenterFlexbox>
        <SecHeader>
          <div>Request Label</div>
        </SecHeader>
        {this.state.profileInfo ? (
          <ProdProfile profileInfo={this.state.profileInfo} />
        ) : (
          <Spinner />
        )}
        {this.state.profileInfo ? (
          <LabelReqForm
          partnerId={this.props.location.state.data.manfId}
          productId={this.props.location.state.data.productId}
          catgId={this.state.profileInfo.catgId}
          location={this.props.location}
          match = {this.props.match}
        />) : (
          <Spinner />
        )}
        {this.state.labelsInfo ? (
          <LabelTable
            labelsInfo={this.state.labelsInfo}
            profileInfo={this.state.profileInfo}
          />
        ) : (
          <Spinner />
        )}
      </CenterFlexbox>
    );
  }
}
