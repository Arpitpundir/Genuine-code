import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        margin:"15px",
        textAlign: "center",
        height: "200px"
    },
    center:{
        marginLeft: "15px"
    }
});

export default function ImgMediaCard(props) {
    const classes = useStyles();

    const renderTable = async ()=>{
        const res = await axios({
            method:"GET",
            url: "http://127.0.0.1:3000/api/v1/category/"+props.data._id+"/product",
        });
        console.log(res.data);
        if(res.data.status == "success"){
            console.log(res.data.docs._id, " 5");
            props.changeMainSection(5, res.data.docs, props.mfId, res.data.docs._id);
        }
    }

    return (
        <Card className = {classes.card} onClick = {renderTable}>
        <CardActionArea>
            <CardContent>
            <img src = {require("./../../images/helmet/"+props.data.pht)}></img>
            <Typography gutterBottom variant="h4" component="h4">
                {props.data.n}
            </Typography>
            <Typography variant="h3" color="textSecondary" component="h3">
                {props.data.prd.length}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    );
}