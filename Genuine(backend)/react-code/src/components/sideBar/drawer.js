import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import axios from "axios";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: "100%",
        maxWidth: 360,
        backgroundColor: "#414141",
    },
    selected:{
        backgroundColor: "yellow",
            color: "#0e508c",
        ":hover":{
            backgroundColor: "yellow",
            color: "#0e508c",
        }
    },
    button:{
        fontFamily: "Roboto",
        fontSize: "16px",
        fontWeight: "500",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: "2.44",
        letterSpacing: "normal",
        paddingLeft:"45px",
        textAlign: "left",
        color: "white",
        "&:hover":{
            backgroundColor: "white",
            color: "#0e508c"
        }
    },
    temp:{
        "&.selected":{
            backgroundColor: "white",
            color: "#0e508c",
        }
    }
}
));


export default function SelectedListItem(props) {
    const classes = useStyles();
    console.log(props.mfId, "drawer")
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        if(index === 2){
            const data = getProductData(props.mfId);

        }
    };

    const getProductData = async (mfId) => {
        const res = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:3000/api/v1/category/:'+ mfId,
        });
        if (res.data.status === 'success') {
            props.changeMainSection(4, res.data.data, props.mfId);
        }
    }

    return (
        <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
            <ListItem button selected={selectedIndex === 0}
            onClick={event => handleListItemClick(event, 0) }
            classes = {{button: classes.button,
            root: classes.temp, selected: classes.selected}}
            >
            <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
            button
            selected={selectedIndex === 1}
            onClick={event => handleListItemClick(event, 1)}
            classes = {{button: classes.button}}
            >
            <ListItemText primary="Profile" />
            </ListItem>
            <ListItem
            button
            selected={selectedIndex === 2}
            onClick={event => handleListItemClick(event, 2)}
            classes = {{button: classes.button}}
            >
            <ListItemText primary="Product and Category" />
            </ListItem>
        </List>
        <Divider />
        </div>
    );
    }