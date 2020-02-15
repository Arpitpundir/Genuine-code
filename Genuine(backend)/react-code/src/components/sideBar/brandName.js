import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles({
    brandName:{
        width: "208px",
        height: "60px",
        fontFamily: "Roboto",
        fontSize: "16px",
        fontWeight: "500",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: "1.56",
        letterSpacing: "normal",
        textAlign: "center",
        color: "#ffffff"
    },
    status:{
        width: "175px",
        height: "12px",
        fontFamily: "Calibri",
        fontSize: "12px",
        fontWeight: "300",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: "1.42",
        letterSpacing: "normal",
        textAlign: "left",
        color: "white",
        marginLeft: "20px",
        marginTop: "10px"
    },
    parent:{
        marginTop: "20px",
        display: "inline-block"
    }
});
export default () => {
    const classes = useStyle();
    return(
        <div className = {classes.parent}>
            <div>
            <div className = {classes.brandName}>
            Saluja Kitchen Appliances Private Limited
            </div>
            </div>
            <div className = {classes.status}>A Genuine Approved Manufacturer</div>
        </div>
    )
}