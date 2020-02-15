import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from "./../components/mainSection/header5";
import Table from "./../components/tables/productTable";
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
    console.log(props.catgId, "sec5");
    return(
        <Grid container className = {classes.initial}>
            <Grid item className = {classes.firstRow}>
                <Header changeMainSection = {props.changeMainSection} mfId = {props.mfId} catg = {props.catg}></Header>
            </Grid>
            <Grid item className = {classes.secondRow}>
                <Table changeMainSection = {props.changeMainSection} data = {props.mainSectionData} mfId = {props.mfId} catg = {props.catg}>
                <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
      <script type="text/javascript" src="./lib/qrcode.js"></script>
      <script type="text/javascript" src="lib/jspdf.js"></script>
      <script type="text/javascript" src="lib/FileSaver.min.js"></script>
                </Table>
            </Grid>
        </Grid>
    )
}