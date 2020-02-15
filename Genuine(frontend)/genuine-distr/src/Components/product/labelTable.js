import React from "react"
import CustomTable from "./../Table/CustomTable"
import CenterFlexbox from "./../Flexbox/centerFlexbox"
import SecHeader from "./../secHeader/secHeader"
import VertFlexbox from "./../Flexbox/vertFlexbox"

export default (props) => {
  console.log("djshjskh")
  let labelTableKeys = [],
    labelTableData = [];

    labelTableKeys.push("Date");
    labelTableKeys.push("Product Id");
    labelTableKeys.push("Product Name");
    labelTableKeys.push("No. of Labels");
    labelTableKeys.push("State");
    labelTableKeys.push("City");
    labelTableKeys.push("Status");

    props.labelsInfo.forEach(labelReq => {
      //I need to declare this object because I want fields in certain order

      let tempRow = {
        date: null,
        prdId: null,
        prdName: null,
        no: null,
        state: null,
        city: null,
        status: null
      }; //I need to declare this object because I want fields in certain order
      tempRow.prdName = props.profileInfo.name;
      tempRow.prdId = props.profileInfo._id;
      tempRow.date = labelReq.sdate;
      tempRow.no = labelReq.no;
      tempRow.state = labelReq.location.state;
      tempRow.city = labelReq.location.city;
      tempRow.status = labelReq.status;
      //console.log(tempRow)
      labelTableData = labelTableData.concat(tempRow)
    });
    console.log(labelTableKeys, 'klklklk')
    return(
      <VertFlexbox>
        <SecHeader>
          <div>
            Label Request Status: <p style = {{"color": "#939393", "display": "inline"}}>{props.profileInfo.name}</p>
          </div>
        </SecHeader>
        <CustomTable keys = {labelTableKeys} data = {labelTableData}/>
      </VertFlexbox>
    )
  }