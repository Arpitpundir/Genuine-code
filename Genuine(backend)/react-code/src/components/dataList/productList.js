import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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

}));

export default function FolderList(props) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
        <ListItem>
            <ListItemText primary="Product Id" secondary={props.prodData._id} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Product Created On" secondary = {props.prodData.crtD} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Product Title" secondary = {props.prodData.tit} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Product Name" secondary = {props.prodData.n} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Price" secondary={props.prodData.prc} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Manufacturing Date" secondary={props.prodData.mfgD} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Expiry Date" secondary={props.prodData}/>
        </ListItem>
        <ListItem>
        <FormControlLabel
            control={<Checkbox color="primary" />}
            label="No Warranty Available"
            labelPlacement="end"
            value = "checked"
        />
        </ListItem>
        <ListItem>
            <ListItemText primary="Warranty" secondary={props.prodData.wrnty} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Status" secondary={props.prodData.status} />
        </ListItem>
        </List>
    );
}
