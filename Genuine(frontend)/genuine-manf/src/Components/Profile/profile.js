import React, { Component } from "react";
import Date from "./../UI/Date/date";
//import Image from `./../../Images/flipkartLogo/flipkart1.jpg`
import VerticalFlexbox from "./../Flexbox/vertFlexbox";
import styles from "./profile.module.scss";
import asyncComponent from "./../../hocs/AsyncComponent";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: {}
    };
  }
  // componentDidMount(){
  // 	const path = `./flipkart1.jpg`
  // 	import("./flipkart1.jpg").then(temp => {
  // 		this.setState({
  // 			temp:temp
  // 		})
  // 	})
  // }
  render() {
    let profile = [];

    console.log(this.props.logo);
    if (this.props.logo) {
      const temp = this.state.temp;
      profile.push(
        <div key="logo" className={styles.Profile}>
          <img src={require(`./../../Images${this.props.logo}`)} />
          <p>
            <Date />
          </p>
        </div>
      );
    }

    if (this.props.id) {
      profile.push(
        <div key="vendor-id" className={styles.Profile}>
          <h3>
            <b> VendorId </b>
          </h3>
          <p> {this.props.id}</p>
        </div>
      );
    }
    if (this.props.companyName) {
      profile.push(
        <div key="company-name" className={styles.Profile}>
          <h3>
            <b> Company Name </b>
          </h3>
          <p> {this.props.companyName}</p>
        </div>
      );
    }
    if (this.props.mail) {
      profile.push(
        <div key="mail" className={styles.Profile}>
          <h3>
            <b> Company Email </b>
          </h3>
          <p> {this.props.mail}</p>
        </div>
      );
    }
    if (this.props.phNo) {
      profile.push(
        <div key="phNo" className={styles.Profile}>
          <h3>
            <b>Phone No.</b>
          </h3>
          <p> {this.props.phNo}</p>
        </div>
      );
    }
    if (this.props.address) {
      profile.push(
        <div key="address" className={styles.Profile}>
          <h3>
            <b>Address</b>
          </h3>
          <p> {this.props.address}</p>
        </div>
      );
    }
    if (this.props.price) {
      profile.push(
        <div key="price" className={styles.Profile}>
          <h3>
            <b>Price</b>
          </h3>
          <p> {this.props.price}</p>
        </div>
      );
    }
    if (this.props.productName) {
      profile.push(
        <div key="productName" className={styles.Profile}>
          <h3>
            <b>Product Name</b>
          </h3>
          <p> {this.props.productName}</p>
        </div>
      );
    }
    if (this.props.catg) {
      profile.push(
        <div key="catg" className={styles.Profile}>
          <h3>
            <b>catg</b>
          </h3>
          <p> {this.props.catg}</p>
        </div>
      );
    }
    if (this.props.prdId) {
      profile.push(
        <div key="prdId" className={styles.Profile}>
          <h3>
            <b>Product Id</b>
          </h3>
          <p> {this.props.prdId}</p>
        </div>
      );
    }
    if (this.props.createdOn) {
      profile.push(
        <div key="createdOn" className={styles.Profile}>
          <h3>
            <b>Product Created On</b>
          </h3>
          <p> {this.props.createdOn}</p>
        </div>
      );
		}
	
    if (this.props.title) {
      profile.push(
        <div key="title" className={styles.Profile}>
          <h3>
            <b>Product Title</b>
          </h3>
          <p> {this.props.title}</p>
        </div>
      );
    }
    if (this.props.manfDate) {
      profile.push(
        <div key="manfDate" className={styles.Profile}>
          <h3>
            <b>Product Manufacturing date</b>
          </h3>
          <p> {this.props.manfDate}</p>
        </div>
      );
    }
    if (this.props.expDate) {
      profile.push(
        <div key="expDate" className={styles.Profile}>
          <h3>
            <b>Product Expiry Date</b>
          </h3>
          <p> {this.props.expDate}</p>
        </div>
      );
    }
    if (this.props.desc) {
      profile.push(
        <div key="desc" className={styles.Profile}>
          <h3>
            <b>Description</b>
          </h3>
          <p> {this.props.desc}</p>
        </div>
      );
    }
    if (this.props.status) {
      profile.push(
        <div key="status" className={styles.Profile}>
          <h3>
            <b>Status</b>
          </h3>
          {this.props.status == "Active" ? (
            <p style={{ color: "green" }}>{this.props.status}</p>
          ) : (
            <p style={{ color: "red" }}> {this.props.status}</p>
          )}
        </div>
      );
		}
		if (this.props.qr) {
			console.log(this.props.qr)
			profile.push(
				<div key="qr" className={styles.Profile}>
					<h3>
						<b>Unique QR</b>
					</h3>
					<p><img src = {this.props.qr}/></p>
				</div>
			);
		}
    return profile;
  }
}

export default Profile;
