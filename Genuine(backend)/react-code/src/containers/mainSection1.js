import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from "./../components/mainSection/header";
import ProfileForm from "./../components/forms/profileForm"
import { getThemeProps } from '@material-ui/styles';
const useStyles = makeStyles({
    initial:{
        height: "100%",
        width: "100%"
    },
    firstRow:{
        height:"8%",
        width: "94%",
        margin: "20px"
    },
    secondRow:{
        height: "92%",
        width: "100%",
        padding: "30px"
    }
});
export default (props) => {
    const classes = useStyles();
    return(
        <Grid container className = {classes.initial}>
            <Grid item className = {classes.firstRow}>
                <Header>"Create Your Profile"</Header>
            </Grid>
            <Grid item className = {classes.secondRow}>
                <ProfileForm changeMainSection = {props.changeMainSection}></ProfileForm>
            </Grid>
        </Grid>
    )
}