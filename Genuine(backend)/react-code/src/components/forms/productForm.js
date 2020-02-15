import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from "axios";
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';

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
            margin: theme.spacing(1),
        },
}));



export default function TextFields(props) {
    const classes = useStyles();
    console.log(props.catg, "prod");
    const [values, setValues] = React.useState({
        title: '',
        name: '',
        price: '',
        mfgDate: '',
        expDate: "",
        wrntyInfo: "",
        wrnty: "",
        status:"",
        crtDate: Date.now()
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const makeProduct = async (e) => {
        e.preventDefault();
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/category/' + props.catg + "/product",
            data: {
                n:values.name,
                tit: values.title,
                prc: values.price,
                mfgDate: values.mfgDate,
                expDate: values.expDate,
                wrntyInfo: values.wrntyInfo,
                wrnty: values.wrnty,
                status: values.status,
                crtD: values.crtDate
            }
        });
        if (res.data.status === 'success') {
            const res2 = await axios({
                method:"GET",
                url: "http://127.0.0.1:3000/api/v1/category/"+props.catg+"/product",
            });
            console.log(res2.data);
            if(res.data.status == "success"){
                props.changeMainSection(5, res2.data.docs.prd, props.mfId, props.catg);
            }
        }
    }

return (
    <form container className={classes.container} noValidate autoComplete="off" onSubmit = {makeProduct}>
        <Grid xs = {12} item>
        <TextField
            required
            id="standard-required"
            label="Product Title"
            className={classes.textField}
            margin="normal"
            placeholder = "Product Title"
            onChange={handleChange('title')}
        />
        </Grid>
        <Grid xs = {12} item>
        <TextField
            required
            id="standard-required"
            label="Product Name"
            className={classes.textField}
            margin="normal"
            placeholder = "Product Name"
            onChange={handleChange('name')}
        />
        </Grid>
        <Grid xs = {12} item>
        <TextField
            required
            id="standard-required"
            label="Price"
            className={classes.textField}
            margin="normal"
            placeholder = "Price"
            onChange={handleChange('price')}
        />
        </Grid>
        <Grid xs = {12} item>
        <TextField
            required
            id="standard-required"
            label="Manufacturing Date"
            className={classes.textField}
            margin="normal"
            placeholder = "Manufacturing Date"
            onChange={handleChange('mfgDate')}
        />
        </Grid>
        <Grid xs = {12} item>
        <TextField
            required
            id="standard-required"
            label="Expiry Date"
            className={classes.textField}
            margin="normal"
            placeholder = "Expiry Date"
            onChange={handleChange('expDate')}
        />
        </Grid>
        <Grid xs = {12} item>
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="No Warranty Available"
          labelPlacement="start"
        />        </Grid>
        <Grid xs = {12} item>
        <TextField
            id="standard-required"
            label="Warranty"
            multiline
            rows="4"
            className={classes.textField}
            margin="normal"
            onChange={handleChange("wrnty")}
        />
        </Grid>
        <Grid xs = {12} item>
        <TextField
            id="standard-multiline-static"
            label="Description"
            multiline
            rows="4"
            defaultValue="Description"
            className={classes.textField}
            margin="normal"
            onChange={handleChange("wrntyInfo")}
        />
        </Grid>
        <Grid item xs = {12}>
        <InputLabel htmlFor="age-native-simple">Status</InputLabel>
        <Select
            native
            onChange={handleChange('status')}
            inputProps={{
                name: 'status',
                id: 'status-native-simple',
            }}
            >
            <option value=""/>
            <option value={"Active"}>Active</option>
            <option value={"De-Active"}>De-Active</option>
        </Select>
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