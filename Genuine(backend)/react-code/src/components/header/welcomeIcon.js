import React from "react";
import { fade, makeStyles } from '@material-ui/core/styles';
const useStyle = makeStyles({
    headerWelcomeIcon:{
        width: "159px",
        height: "61px",
        borderRadius: "6px",
        backgroundColor: "#00515c"
    },
    headerWelcomeIconText: {
        width: "86px",
        height: "36px",
        fontFamily: "Roboto",
        fontSize: "14px",
        fontWeight: "500",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: "1.43",
        letterSpacing: "normal",
        textAlign: "left",
        color: "#ffffff",
        margin:"10px"
    }
})
export default() => {
    const classes = useStyle();
    return(
        <div className = {classes.headerWelcomeIcon}>
            <div className = {classes.headerWelcomeIconText}>
                Welcome Sanjay Kumar
            </div>
        </div>
    )
}