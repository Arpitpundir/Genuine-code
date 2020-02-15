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
import { getThemeProps } from '@material-ui/styles';
const useStyles = makeStyles(theme => ({
    container: {
        margin:"20px"
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
            textAlign: "left"
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
            margin: theme.spacing(1),
        },
}));



export default function SignUpForm(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        photo: ''
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const signUp = async (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.values.email, this.state.values.password, this.state.values.name, this.state.values.address, this.state.values.phone, this.state.values.photo);
    };

return (
    <form container className={classes.container} noValidate autoComplete="off" onSubmit = {e => signUp(e)}>
        <Grid item xs = {12}>
            <div className = {classes.manfId}>ManufacturerId: 125098</div>
            <div className = {classes.date}>Date: 12/12/2019</div>
        </Grid>
        <Grid xs = {12} item>
        <TextField
            required
            id="standard-required"
            label="Company Name"
            className={classes.textField}
            margin="normal"
            placeholder = "Company Name"
            onChange={handleChange('name')}
        />
        </Grid>
        <Grid xs = {12} item>
        <TextField
            required
            id="standard-required"
            label="Email"
            className={classes.textField}
            margin="normal"
            placeholder = "Email"
            onChange={handleChange('email')}
        />
        </Grid>
        <Grid xs = {12} item>
        <TextField
            required
            id="standard-required"
            label="Phone"
            className={classes.textField}
            margin="normal"
            placeholder = "Phone"
            onChange={handleChange('phone')}
        />
        </Grid>
        <Grid xs = {12} item>
        <TextField
            required
            id="standard-required"
            label="Address"
            className={classes.textField}
            margin="normal"
            placeholder = "Address"
            onChange={handleChange('address')}
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
                <div className = {classes.uploadLogoText}>Upload Your Company Logo</div>
            </label>
        </Grid>
        <Grid item>
        <Button
        variant="contained"
        color="primary"
        size = "large"
        type = "submit"
        className={classes.button}
        startIcon={<SaveIcon />}
        >
        Save
        </Button>
        </Grid>
    </form>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, name, address, phone, photo) => dispatch(action.auth(email, password, name, address, phone, photo))
    }
};

export default connect( null, mapDispatchToProps )(SignUpForm);