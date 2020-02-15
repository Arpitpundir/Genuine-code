import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from "./../components/mainSection/header6";
import ProductForm from "./../components/forms/productForm";
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
        padding: "30px",
        paddingTop: "0px"
    }
});
export default (props) => {
    const classes = useStyles();
    console.log(props.catg, 6);
    return(
        <Grid container className = {classes.initial}>
            <Grid item className = {classes.firstRow}>
                <Header></Header>
            </Grid>
            <Grid item className = {classes.secondRow}>
                <ProductForm catg = {props.catg} changeMainSection = {props.changeMainSection} mfId = {props.mfId}></ProductForm>
            </Grid>
        </Grid>
    )
}