import React, { Component } from "react";
import CenterFlexbox from "./../Flexbox/centerFlexbox";
import { axiosInstance } from "./../../hocs/AxiosInstance";
import AuthContext from "./../../context/authContext";
import VertFlexbox from "./../Flexbox/vertFlexbox";
import Profile from "./../Profile/profile";
import ProdTable from "./prodTable";
import SecHeader from "./../secHeader/secHeader";
import Aux from "./../../hocs/Aux";
import styles from "./manfCont.module.scss";
import LabelTable from "./labelTable";
import Spinner from "./../UI/Spinner/spinner";

export default class manfCont extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: null,
      productsInfo: null
    };
  }

  componentDidMount(){
    axiosInstance({
      url: `/distr/${this.context.distrId}/partners/${this.props.location.state.data.manfId}`, //${this.props.location.state.manfId}`,
      method: "GET",
      withCredentials: true
    }).then(res => {
      this.setState({
        profileInfo: res.data.items.profile,
        productsInfo: res.data.items.products
      });
    });
  }

  render() {
    let labelTableKeys = [],
      labelTableData = [];
      let labelTable;
    if (this.state.productsInfo) {
      labelTableKeys.push("Date");
      labelTableKeys.push("Product Id");
      labelTableKeys.push("Product Name");
      labelTableKeys.push("No. of Labels");
      labelTableKeys.push("State");
      labelTableKeys.push("City");
      labelTableKeys.push("Status");

      this.state.productsInfo.forEach(product => {
         //I need to declare this object because I want fields in certain order

        let rows = product.labels.map(labelInfo => {
          let tempRow = {
            date: null,
            prdId: null,
            prdName: null,
            no: null,
            state: null,
            city: null,
            status: null
          }; //I need to declare this object because I want fields in certain order
          tempRow.prdName = product.profile.name;
          tempRow.prdId = product.profile._id;
          tempRow.date = labelInfo.sdate;
          tempRow.no = labelInfo.no;
          tempRow.state = labelInfo.location.state;
          tempRow.city = labelInfo.location.city;
          tempRow.status = labelInfo.status;
          console.log(tempRow)
          return tempRow;
        });
        labelTableData = labelTableData.concat(rows)
        
      });
      labelTable = <LabelTable
        labelTableKeys={labelTableKeys}
        labelTableData={labelTableData}
      ></LabelTable>
    }
    console.log(labelTableKeys)
    console.log(labelTableData)
    return (
      <CenterFlexbox>
        {this.state.profileInfo ? (
          <Aux>
            <SecHeader>
              <div>Manufacturer Partner - {this.state.profileInfo.name}</div>
            </SecHeader>
            <VertFlexbox>
            <Profile
                companyName={this.state.profileInfo.name}
                mail={this.state.profileInfo.email}
                phNo={this.state.profileInfo.phNo}
                address={this.state.profileInfo.address}
                logo={"/pumaLogo/puma1.png"}
                id={this.state.profileInfo._id}
              />
            </VertFlexbox>
          </Aux>
        ) : (
          <Spinner />
        )}
        <VertFlexbox>
          {this.state.productsInfo ? (
            <Aux>
              <SecHeader classes={["GreyHeader"]}>
                <div>Products in business</div>
              </SecHeader>
              <ProdTable
                profileInfo = {this.state.profileInfo}
                products={this.state.productsInfo}
                match={this.props.match}
              ></ProdTable>
            </Aux>
          ) : (
            <Spinner />
          )}
        </VertFlexbox>
        {this.state.productsInfo ? (
          labelTable
        ) : (
          <Spinner />
        )}
      </CenterFlexbox>
    );
  }
}
