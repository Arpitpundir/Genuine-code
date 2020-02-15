import React, { Component } from 'react';
import {connect} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from "./../components/Auth/Header";
import SignUp from "./../../components/Auth/SignUp";
import LogIn from "./../../components/Auth/Login"
import { getThemeProps } from '@material-ui/styles';
import classes from "./Auth.css";
import { dispatch } from 'rxjs/internal/observable/range';

class Auth extends Component{
  state = {
    formType: "SignUp"
  }
  changeFormType = (newFormType) => {
    this.formType = newFormType;
  }
  render{
    return(
        <Grid container className = {classes.initial}>
            <Grid item className = {classes.firstRow}>
                <Header formType = {this.formType} changeFormType = {this.changeFormType}>
                {
                  this.state.formType === "SignUp"?"Create Your Profile":"Login Your Profile"
                }
                </Header>
            </Grid>
            <Grid item className = {classes.secondRow}>
            {
              this.state.formType === "SignUp"?<SignUp changeMainSection = {this.props.changeMainSection}></SignUp>:<LogIn changeMainSection = {this.props.changeMainSection}></LogIn>
            }
            </Grid>
        </Grid>
        )
          }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, name, address, phone, photo) => dispatch(action.auth(email, password, name, address, phone, photo))
  }
};

export default Auth;