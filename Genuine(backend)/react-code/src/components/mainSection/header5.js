import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "white",
        color: "#5c5c5c"

    },
    title: {
        flexGrow: 1,
        color: "#5c5c5c"
    },
}));

export default function ButtonAppBar(props) {
    const classes = useStyles();

    const openProdForm = () => {
        props.changeMainSection(6, null, props.mfId, props.catg);
    }

    return (
        <AppBar position="static" className = {classes.root}>
            <Toolbar>
            <Typography variant="h6" className={classes.title}>
                Helmet
            </Typography>
            <Button variant="contained" className={classes.button} onClick = {openProdForm}>Create New Product</Button>
            </Toolbar>
        </AppBar>
    );
}