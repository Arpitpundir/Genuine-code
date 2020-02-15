import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import BrandLogo from "./brandLogo";
import WelcomeIcon from "./welcomeIcon";
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles(theme => ({
grow: {
    flexGrow: 1,
},
title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
    display: 'block',
    },
},
sectionDesktop: {
    display: 'flex',
},
headerAppbar: {
    backgroundColor: "#006d7b",
    height: "100%",
    padding: "0"
},
center: {
paddingTop: "13px"
}

}));

export default function PrimarySearchAppBar() { 
    const classes = useStyles();
    return (
        <AppBar position="static" className = {classes.headerAppbar}>
            <Toolbar>
                <Grid container>
                    <Grid item xs = {2}>
                        <BrandLogo></BrandLogo>
                    </Grid>
                    <Grid item xs = {6}>
                    </Grid>
                    <Grid container item xs = {4} className = {classes.center}>
                        <Grid item xs = {2} >
                            <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                            </IconButton>
                        </Grid>
                        <Grid item xs = {3}>
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                            </IconButton>
                        </Grid>
                        <Grid item>
                        <WelcomeIcon></WelcomeIcon>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}