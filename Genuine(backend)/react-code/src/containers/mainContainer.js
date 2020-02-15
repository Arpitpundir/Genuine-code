import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from "./../components/header/appBar";
import Sidebar from "./sidebarContainer";
import MainSection from "./../containers/mainSection";
import MainSection1 from "./mainSection1";
import MainSection2 from "./mainSection2";
import MainSection3 from "./mainSection3";
import MainSection4 from "./mainSection4";
import MainSection5 from "./mainSection5";
import MainSection6 from "./mainSection6";
import MainSection7 from "./mainSection7";

const useStyles = makeStyles({
    mainHeader: {
        height: "14%"
    },
    sideBar: {
        height: "96%",
        width: "20%"
    },
    initialSettings: {
        width: "100%",
        height: "100%"
    },
    mainSection: {
        width: "80%",
        height: "100%"
    }
});

export default function CenteredGrid() {
    const classes = useStyles();
    const [mainSection, setMainSection] = React.useState({
        type:1
        data:null
    });

    const changeMainSection = (type, data) =>{
        setMainSection({type, data});
    }

    return (
        <Grid container  className = {classes.initialSettings} spacing = {0}>
            <Grid item xs={12} className = {classes.mainHeader}>
                <AppBar></AppBar>
            </Grid>
            <Grid item className = {classes.sideBar}>
                <Sidebar></Sidebar>
            </Grid>
            <Grid item className = {classes.mainSection}>
                <MainSection></MainSection>
            </Grid>
        </Grid>
    );
}
