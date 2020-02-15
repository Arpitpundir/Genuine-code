import React from "react";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Brand from "./../components/sideBar/brandName";
import Drawer from "./../components/sideBar/drawer";
const useStyle = makeStyles({
    sidebar: {
        width: "100%",
        height: "100%",
        backgroundColor: "#414141",
        justifyContent: "center",
        paddingTop: "50px"
    },
    drawerCont:{
        height: "70%",
        width: "100%"
    }
})
export default (props) => {
    const classes = useStyle();
    return(
        <Grid container className = {classes.sidebar}>
            <Grid item>
                <Brand></Brand>
            </Grid>
            <Grid item className = {classes.drawerCont} >
                <Drawer changeMainSection = {props.changeMainSection} mainSectionData = {props.mainSectionData} mfId = {props.mfId}></Drawer>
            </Grid>
        </Grid>
    )
}