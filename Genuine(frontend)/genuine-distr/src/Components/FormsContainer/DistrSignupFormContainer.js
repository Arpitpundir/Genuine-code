import React, { Component } from "react";
//import styles from "./DistrSignupFormCont.module.scss"
import styles from "./Form.module.scss";
import Validator from "validator";
import isEmail from "validator/lib/isEmail";
import Input from "./../../Components/UI/Input/Input";
import SecHeader from "./../secHeader/secHeader";
import Button from "./../UI/Button/button";
import axios from "axios";
import Date from "./../UI/Date/date";
import CenterFlexbox from "./../Flexbox/centerFlexbox";
import VerticalFlexbox from "./../Flexbox/vertFlexbox";
import AuthContext from "./../../context/authContext";

class DistrForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: {
          elementType: "input",
          inputType: "text",
          placeholder: "Company Name",
          validation: {
            required: true
          },
          value: "",
          valid: false,
          touched: false
        },
        email: {
          elementType: "input",
          inputType: "email",
          placeholder: "Email",
          value: "",
          valid: false,
          touched: false,
          validation: {
            required: true,
            isEmail: true
          }
        },
        phoneNo: {
          elementType: "input",
          inputType: "tel",
          placeholder: "Phone No",
          value: "",
          valid: false,
          touched: false,
          validation: {
            required: true,
            isMobilePhone: true
          }
        },
        address: {
          elementType: "textarea",
          inputType: "textarea",
          placeholder: "Address",
          value: "",
          valid: false,
          touched: false,
          validation: {
            required: true
          }
        },
        password:{
          elementType: "input",
          inputType: "password",
          placeholder: "Password",
          value: "",
          valid: false,
          touched: false,
          validation:{
            required: true,
            minlen: 8
          }
        },
        logo: {
          elementType: "input-image",
          imageName: "logo.png",
          inputType: "image",
          label: "Upload Your Photo",
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
        email: this.state.form.email.value,
        address: this.state.form.address.value,
        phNo: this.state.form.phoneNo.value,
        password: this.state.form.password.value
      };
      //console.log(data);
      axios({
        method: "POST",
        url: "http://127.0.0.1:9000/api/v1/distr/signup",
        data: data,
        withCredentials: true
      })
        .then(res => {
          console.log(res)
          const distr = res.data.item;
          console.log(distr)
          this.context.authHandler({
            isAuthenticated: true,
            distrId: distr._id,
            token: res.data.token
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
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
        validation={this.state.form.validation}
      />
      </div>
    ));

    return (
      <CenterFlexbox>
        <SecHeader>
          <div> Log In Your Account </div>
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

export default DistrForm;
