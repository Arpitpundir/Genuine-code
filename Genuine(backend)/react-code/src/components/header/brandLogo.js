import React from "react";
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    circleLogo: {
        width: "100.2px",
        height: "100.2px",
        backgroundColor: "white",
        borderRadius: "60%",
        position: "relative",
        left: "30%",
        top: "50%",
        zIndex: "1.2"
    }
}))
export default (props) => {
    const classes = useStyles()
    return (
        <Paper className = {classes.circleLogo} circle = {true} zDepth = {1}>
            <img src={require("./../../images/Saluja-Gold.png")}>
            </img>
        </Paper>
    )
}