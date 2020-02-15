import React, { Component } from "react";
import {Link, NavLink} from "react-router-dom";
import styles from "./Table.module.scss";

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
  }

  getKeys = function() {
    console.log(this.props.data)
    return Object.keys(this.props.data[0]);
  };

  getHeader = function() {
    var keys = this.getKeys();
    return keys.map((key, index) => {
      return <td key={key}>{key.toUpperCase()}</td>;
    });
  };

  getRowsData = function(){
    var items = this.props.data;
    var keys = this.getKeys();
    return items.map((row, index) => {
      return (
          <tr key={index}>
            <RenderRow key={index} data={row} keys={keys} match = {this.props.match} />
          </tr>
      );
    });
  };

  render() {
    console.log(this.props.match)
    return (
        <table className = {styles.Table}>
          <thead>
            <tr>{this.getHeader()}</tr>
          </thead>
          <tbody>{this.getRowsData()}</tbody>
        </table>
    );
  }
}
const RenderRow = props => {
  return props.keys.map((key, index) => {
    if(key == "_id"){
      //console.log(props.match["url"], props.data[key])
      return <td key={props.data[key]}><Link to = {{pathname: `${props.match.url}/${props.data[key]}`,
      state:{
        ...props.data
      }}}>{props.data[key]}</Link></td>
    }
    if(key == "link"){

      return <td key={props.data[key]}><Link to = {{pathname: `${props.match.url}${props.data[key].path}`,
      state:{
        data: props.data[key].data
      }}}>{props.data[key].link}</Link></td>
    }
    return <td key={props.data[key]}>{props.data[key]}</td>;
  });
};
