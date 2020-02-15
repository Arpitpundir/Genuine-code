import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Table.module.scss";
import Button from "./../UI/Button/button"
import Aux from "./../../hocs/Aux"

export default class CustomTable extends Component {
  constructor(props) {
    super(props);
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this)
  }
  getHeader() {
    return this.props.keys.map(key => <td key={key}>{key}</td>);
  }

  getRowsData = function(){
    var items = this.props.data;
    return items.map((row, index) => {
      return (
          <tr key={index}>
            <RenderRow key={index} data={row} match = {this.props.match} labelsGenerateHandler = {this.props.labelsGenerateHandler}/>
          </tr>
      );
    });
  };

  render(){
    console.log(this.props.keys)

    return(
      <table className = {styles.Table}>
        <thead>
          {this.getHeader()}
        </thead>
        <tbody>
          {this.getRowsData()}
        </tbody>
      </table>
    )
  }
}

const RenderRow = (props) => {
return Object.keys(props.data).map(key => {
  if(key == "status"){
    if (props.data[key] == "Requested"){
      return <td style = {{"color": "#ff8900"}}key = {key}>{props.data[key]}</td>
    }else if (props.data[key] == "Approved"){
      return <td style = {{"color": "green"}}key = {key}>{props.data[key]}</td>
    }else if (props.data[key] == "Cancelled"){
      return <td style = {{"color": "#e60000"}}key = {key}>{props.data[key]}</td>
    }
  }else if(key == "statusManf"){
    if(props.data[key] == "Requested"){
      return (
        <Aux>
          <Button clicked = {() => props.labelsGenerateHandler({no: props.data.no,
          state: props.data.state, city: props.data.city})} classes = {["Button--3"]}>Generate</Button>
          <Button clicked = {props.declineRequest} classes = {["Button--3"]}>Decline</Button>
        </Aux>
      )
    }else {
      return (<td style = {{"color": "#e60000"}}key = {key}>{props.data[key]}</td>)

    }
  }
  else if(key == "link"){

    return <td key={props.data[key]}><Link to = {{pathname: `${props.match.url}${props.data[key].path}`,
    state:{
      data: props.data[key].data
    }}}>{props.data[key].data._id}</Link></td>
  }
  else if(key == "labelReq"){
    if(props.data[key] == "0"){
      return  <td key = {key}>No labels Requests</td>
    }else{
      return  <td style = {{"color": "#e60000"}}key = {key}>{props.data[key]} Labels Requests</td>
    }
  }
    return <td key = {key}>{props.data[key]}</td>
    })
}