import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    imageDiv:{
        padding: "10px",
        border: "1px solid black"
    },
    manfId:{
        fontFamily: "Roboto",
        fontSize: "18px",
        fontWeight: "500",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: "1.17",
        letterSpacing: "normal",
        textAlign: "center",
        color: "#6a6a6a",
        textAlign: "left",
    },
    date:{
        
        fontFamily: "Roboto",
        fontSize: "18px",
        fontWeight: "500",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: "1.17",
        letterSpacing: "normal",
        textAlign: "center",
        color: "#6a6a6a",
        textAlign: "left"
    },
}));

export default function FolderList(props) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
        <List>
            <ListItem><img className = {classes.imageDiv}src = {require("./../../images/logo_2x1.png")}></img></ListItem>
            <ListItem className = {classes.manfId}>Manufacturer Id: 12345</ListItem>
            <ListItem className = {classes.date}>Date: 12/12/2019</ListItem>
        </List>
        <ListItem>
            <ListItemText primary="Company" secondary={props.data.name} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Phone" secondary={props.data.phone} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Email" secondary={props.data.email} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Address" secondary={props.data.address} />
        </ListItem>
        </List>
    );
}
