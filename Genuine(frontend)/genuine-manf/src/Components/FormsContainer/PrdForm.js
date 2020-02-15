import React, { Component } from "react";
//import styles from "./DistrSignupFormCont.module.scss"
import styles from "./Form.module.scss";
import Validator from "validator";
import isEmail from "validator/lib/isEmail";
import Input from "../UI/Input/Input";
import SecHeader from "./../secHeader/secHeader";
import Button from "../UI/Button/button";
import axios from "axios";
import Date from "../UI/Date/date";
import CenterFlexbox from "./../Flexbox/centerFlexbox";
import VerticalFlexbox from "./../Flexbox/vertFlexbox";
import AuthContext from "../../context/authContext";
import {axiosInstance} from "./../../hocs/AxiosInstance"
import {Redirect} from "react-router-dom"

class ManfSignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      form: {
        name: {
          elementType: "input",
          inputType: "text",
          placeholder: "Product Name",
          validation: {
            required: true
          },
          value: "",
          valid: false,
          touched: false
        },
        title: {
          elementType: "input",
          inputType: "text",
          placeholder: "Product title",
          validation: {
            required: true
          },
          value: "",
          valid: false,
          touched: false
        },
        price: {
          elementType: "input",
          inputType: "text",
          placeholder: "Price",
          value: "",
          valid: false,
          touched: false,
          validation: {
            required: true,
            isNumber: true
          }
        },
        manfDate: {
          elementType: "date",
          inputType: "date",
          placeholder: "Manufacturing Date",
          value: "",
          valid: false,
          touched: false,
          validation: {
            required: true
          }
        },
        expDate: {
          elementType: "date",
          inputType: "date",
          placeholder: "Expiry Date",
          value: "",
          valid: false,
          touched: false,
          validation: {
            required: true
          }
        },
        noWrnty:{
          elementType: "checkbox",
          inputType: "checkbox",
          valueText: "No warranty available",
          value: "",
          valid: false,
          validation: {
            
          }
        },
        wrnty: {
          elementType: "input",
          inputType: "text",
          placeholder: "Warranty For ex: 365 Days",
          value: "",
          valid: false,
          touched: false,
          validation: {
            required: true
          }
        },
        description: {
          elementType: "textarea",
          inputType: "textarea",
          placeholder: "Description",
          value: "",
          valid: false,
          touched: false,
          validation: {
            required: true
          }
        },
        logo: {
          elementType: "input-image",
          imageName: "logo.png",
          inputType: "image",
          label: "Upload Product Photo",
          value: "",
          valid: false,
          touched: false,
          validation: {
            required: true
          }
        }
      },
      formIsValid: false
    };
  }
  static contextType = AuthContext;

  checkValidity(rules, value) {
    let isValid = true;
    Object.keys(rules).forEach(rule => {
      if (rule == "required") {
        isValid =
          isValid &&
          !Validator.isEmpty(Validator.ltrim(Validator.rtrim(value)));
      } else if (rule == "minlen") {
        isValid = isValid && Validator.isLength(value, rules[rule]);
      } else if (rule == "maxlen") {
        isValid = isValid && Validator.isLength(value, 0, rules[rule] + 1);
      } else if (rule == "isEmail") {
        isValid = isValid && Validator.isEmail(value);
      } else if (rule == "isNumber") {
        isValid = isValid && Validator.isNumeric(value);
      }
    });
    return isValid;
  }
  inputChangeHandler = (event, inputElementIdentifier) => {
    //updatedForm = this.state.form we should not update the state
    //directly, above assingement will create a reference
    let updatedForm = {
      ...this.state.form
    };
    let updatedFormElement = updatedForm[inputElementIdentifier];
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.validation,
      updatedFormElement.value
    );
    updatedFormElement.touched = true;
    updatedForm[inputElementIdentifier] = updatedFormElement;

    let isValid = true;
    for (let inputIdentifier in updatedForm) {
      console.log(inputIdentifier, updatedForm[inputIdentifier].valid);
      isValid = isValid && updatedForm[inputIdentifier].valid;
    }
    this.setState({
      form: updatedForm,
      formIsValid: isValid
    });
  };

  submitHandler = event => {
    event.preventDefault();
    console.log(this.state.formIsValid);
    if (this.state.formIsValid) {
      const data = {
        name: this.state.form.name.value,
        title: this.state.form.title.value,
        price: this.state.form.price.value,
        manfDate: this.state.form.manfDate.value,
        expDate: this.state.form.expDate.value,
        noWrnty: this.state.form.noWrnty.value,
        wrnty: this.state.form.wrnty.value,
        desc: this.state.form.description.value,
      };
      //console.log(data);
      axiosInstance({
        method: "POST",
        url: `http://127.0.0.1:9000/api/v1/manf/${this.context.manfId}/catg/${this.props.location.state.catgId}/product`,
        data: data,
        withCredentials: true
      })
        .then(res => {
          this.setState({
            redirect: true
          })
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    if(this.state.redirect){
      console.log("nmnm")
      return (<Redirect to = {{pathname: `/manf/${this.context.manfId}/catg/${this.props.location.state.catgId}/product`,
    state:{
      catgId: this.props.location.state.catgId
    }}}/>)
    }
    const form = Object.keys(this.state.form).map(inputField => (
      <div className = {styles.wrapper}>
      <Input
        key={inputField}
        elementType={this.state.form[inputField].elementType}
        inputType={this.state.form[inputField].inputType}
        placeholder={this.state.form[inputField].placeholder}
        value={this.state.form[inputField].value}
        valid={this.state.form[inputField].valid}
        changed={event => this.inputChangeHandler(event, inputField)}
        touched={this.state.form[inputField].touched}
        label={this.state.form[inputField].label}
        validation={this.state.form[inputField].validation}
        valueText = {this.state.form[inputField].valueText}
      />
      </div>
    ));

    return (
      <CenterFlexbox>
        <SecHeader>
          <div>New Product</div>
        </SecHeader>
        <VerticalFlexbox>
          <div className = {styles.wrapper}>
            <Date/>
          </div>
          {form}
          <div className = {styles.wrapper}>
            <Button
              classes={["Button--1", "Submit"]}
              clicked={event => this.submitHandler(event)}
            >
              {" "}
              Submit{" "}
            </Button>
          </div>
        </VerticalFlexbox>
      </CenterFlexbox>
    );
  }
}

export default ManfSignupForm;
