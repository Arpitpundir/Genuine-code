import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from "../components/cards/productCard";
import Header from "../components/mainSection/header4"
import Grid from '@material-ui/core/Grid';
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
    var catgCards = null;
    console.log(props.mainSectionData)
    if(props.mainSectionData){
        catgCards = props.mainSectionData.map(catg => 
            <Grid item xs = {3}>
                <Card changeMainSection = {props.changeMainSection} mfId = {props.mfId} data = {catg}></Card>
            </Grid>
        );
    }
    return(
        <Grid container className = {classes.initial} spacing = {3}>
            <Grid item className = {classes.firstRow}>
                <Header changeMainSection = {props.changeMainSection} mfId = {props.mfId}>"Product Categories"</Header>
            </Grid>
            {catgCards}
        </Grid>
    )
}