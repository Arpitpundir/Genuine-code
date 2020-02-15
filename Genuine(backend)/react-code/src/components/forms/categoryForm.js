import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import axios from "axios";

const useStyles = makeStyles(theme => ({
    container: {
        margin:"20px"
        },
        input: {
            display: 'none',
        },
        uploadLogoText:{
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: "500",
            fontStyle: "normal",
            fontStretch: "normal",
            lineHeight: "1.19",
            letterSpacing: "normal",
            textAlign: "center",
            color: "#4d4d4d",
        },
        button: {
            margin: "20px",
            
        },
        saveButton:{
            backgroundColor: "#006d7b"
        }
}));



export default function TextFields(props) {
    const classes = useStyles();
    console.log(props.mfId, "form");
    const [values, setValues] = React.useState({
        name: '',
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const createNewCatg = async (e) => {
        e.preventDefault();

        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/category/',
            data: {
                n:values.name,
                pht: "helmet1x.jpg",
                mfId: props.mfId
            }
        });
        if (res.data.status === 'success') {
            const res2 = await axios({
                method: 'GET',
                url: 'http://127.0.0.1:3000/api/v1/category/'+ props.mfId,
            });
            if (res2.data.status === 'success') {
                console.log(res2.data)
                props.changeMainSection(4, res2.data.data, props.mfId);
            }
        }
    };

return (
    <form container className={classes.container} noValidate autoComplete="off">
        
        <Grid xs = {12} item>
        <TextField
            required
            id="standard-required"
            label="Category Name"
            className={classes.textField}
            margin="normal"
            placeholder = "Category Name"
            onChange={handleChange('name')}
        />
        </Grid>
        <Grid item>
            <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"/>
            <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" className={classes.button}>
                    <img src={require("./../../images/Group 366.svg")}>
                    </img>
                </Button>
                <div className = {classes.uploadLogoText}>Upload Category Logo</div>
            </label>
        </Grid>
        <Grid item>
        <Button
        variant="contained"
        color="red"
        size = "large"
        className={[classes.button, classes.saveButton]}
        startIcon={<SaveIcon />}
        onClick = {createNewCatg}
        >
        Save
        </Button>
        </Grid>
    </form>
    );
}