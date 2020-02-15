import React, { Component } from "react";
//import styles from "./DistrSignupFormCont.module.scss"
import styles from "./Form.module.scss";
import Validator from "validator";
import isEmail from "validator/lib/isEmail";
import Input from "./../../Components/UI/Input/Input";
import SecHeader from "./../secHeader/secHeader";
import Button from "./../UI/Button/button";
import {axiosInstance} from "./../../hocs/AxiosInstance";
import Date from "./../UI/Date/date";
import CenterFlexbox from "./../Flexbox/centerFlexbox";
import AuthContext from "./../../context/authContext";
import * as Location from './../../utils/location'
import VertFlexbox from "./../Flexbox/vertFlexbox";
import {Redirect} from "react-router-dom"

class DistrForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      redirect: false,
      form:{
        no:{
          elementType: "input",
          inputType: "text",
          placeholder: "Number of Labels",
          value: "",
          valid: false,
          touched: false,
          validation: {
            required: true,
          }
        },
        locState:{
          elementType: "datalist",
          inputType: "text",
          datalist:{
            options: [ "Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chhattisgarh",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jammu and Kashmir",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttarakhand",
            "Uttar Pradesh",
            "West Bengal",
            "Andaman and Nicobar Islands",
            "Chandigarh",
            "Dadra and Nagar Haveli",
            "Daman and Diu",
            "Delhi",
            "Lakshadweep",
            "Puducherry"],
            id: "State-List"
          },
          placeholder: "State",
          value: "",
          valid: false,
          touched: false,
          validation: {
            required: true
          }
        },
      },
      formIsValid: false
    }
  }

  componentDidMount(){
    let form = this.state.form
      form.city = {
        elementType: "datalist",
        inputType: "text",
        datalist:{
          options: Location.getCitiesStateWise(this.state.form.locState.value),
          id: "City-List"
        },
        placeholder: "City",
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      }
      this.setState({
        form: form
      })
    }

  /*componentDidUpdate(prevProps, prevState){
    console.log(this.state.form.city)
    console.log(this.state.form, prevState.form)
    if(this.state.form.locState.value != prevState.form.locState.value){
      let form = this.state.form
      form["city"] = {
        elementType: "datalist",
        inputType: "text",
        datalist:{
          options: Location.getCitiesStateWise(this.state.form.locState.value),
          id: "City-List"
        },
        placeholder: "City",
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      }
      this.setState({
        form: form
      })
    }
    
  }*/
    
  static contextType = AuthContext

  checkValidity(rules, value){
    let isValid = true
    Object.keys(rules).forEach(rule => {
      if(rule == "required"){
        isValid = isValid && !Validator.isEmpty(Validator.ltrim(Validator.rtrim(value)))
      }else if(rule == "minlen"){
        isValid = isValid && Validator.isLength(value, rules[rule])
      }else if(rule == "maxlen"){
        isValid = isValid && Validator.isLength(value, 0, rules[rule]+1)
      }else if(rule == "isEmail"){
        isValid = isValid && Validator.isEmail(value)
      }else if(rule == "isNumber"){
        isValid = isValid && Validator.isNumeric(value)
      }
    })
    return isValid
  }

  inputChangeHandler = (event, inputElementIdentifier)=>{
    //updatedForm = this.state.form we should not update the state
    //directly, above assingement will create a reference
    let updatedForm = {...this.state.form}
    let updatedFormElement = updatedForm[inputElementIdentifier]
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = this.checkValidity(updatedFormElement.validation,
      updatedFormElement.value)
      console.log(updatedFormElement.value, updatedFormElement.valid)
    updatedFormElement.touched = true
    updatedForm[inputElementIdentifier] = updatedFormElement
    console.log(inputElementIdentifier)
    console.log(updatedForm[inputElementIdentifier])

    let isValid = true
    for(let inputIdentifier in updatedForm){
      isValid = isValid && updatedForm[inputIdentifier].valid
    }
    if(inputElementIdentifier == "locState"){
      updatedForm["city"].datalist.options = Location.getCitiesStateWise(this.state.form.locState.value)
    }
    console.log(isValid)
    this.setState({
      form: updatedForm,
      formIsValid: isValid
    })
    console.log(this.state.form[inputElementIdentifier].value)
  }

  submitHandler = (event) => {
    event.preventDefault()
    if(this.state.formIsValid){
      const data = {
        no: this.state.form.no.value,
        catgId: this.props.catgId,
        location:{
          state: this.state.form.locState.value,
          city: this.state.form.city.value
        }
      }
      console.log(data)
      axiosInstance({
        method: "POST",
        url: `http://127.0.0.1:9000/api/v1/distr/${this.context.distrId}/partners/${this.props.partnerId}/products/${this.props.productId}/labels/requests`,
        data: data,
        withCredentials: true
      }).then(res => {
        this.setState({
          redirect: true
        })
      }).catch(error => {
        console.log(error)
      })
    }
  }

  render(){
    const form = Object.keys(this.state.form).map((inputField)=>
      <div className = {styles.wrapper}>
        <Input key = {inputField} elementType = {this.state.form[inputField].elementType}
        inputType = {this.state.form[inputField].inputType}
        placeholder = {this.state.form[inputField].placeholder}
        value = {this.state.form[inputField].value}
        valid = {this.state.form[inputField].valid}
        changed = {(event) => this.inputChangeHandler(event, inputField)}
        touched = {this.state.form[inputField].touched}
        label = {this.state.form[inputField].label}
        datalist = {this.state.form[inputField].datalist}
        />
      </div>
    )
    if(this.state.redirect){
      return <Redirect to = {{pathname: `${this.props.match.url}`, state:{
        data: this.props.location.state.data
      }}}/>
    }
    return (
    <VertFlexbox>
      <SecHeader>
        <div> Log In Your Account </div>
      </SecHeader>
        <div className = {styles.wrapper}>
          <Date/>
        </div>
        {form}
        <div className = {styles.wrapper}>
          <Button
            classes={["Button--1", "Submit"]}
            clicked={event => this.submitHandler(event)}
          >
            Send
          </Button>
        </div>
    </VertFlexbox>
    )
  }
}

export default DistrForm