import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import QRCode from "./lib/qrcode";
import jsPDF from "./lib/jspdf";
import qrgenerate from "./js/qr_generator"
import { saveAs } from '@progress/kendo-file-saver';


const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

function createData(sNo, photo, name, price, productId, status) {
    return { sNo, photo, name, price, productId, status};
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    tableHead:{
        backgroundColor: "#fff2f2"
    }
}));

export default function CustomizedTables(props) {
    const classes = useStyles();

    const openProductPage = (index) => {
        console.log(props.data[index]);
        props.changeMainSection(7, props.data[index], props.mfId, props.catg);
    };

    
    let i = 0;
    let rows = [];
    for (i = 0;i < props.data.length; i++){
        rows[i] = createData(i+1, props.data[i].pht, props.data[i].n, props.data[i].prc, props.data[i]._id, props.data[i].status);
    }
    return (
        <Paper className={classes.root}>
        <Table className={classes.table}>
            <TableHead classes = {classes.tableHead}>
            <TableRow>
                <StyledTableCell>S.No</StyledTableCell>
                <StyledTableCell align="right">Photo</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Price&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">Product Id</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row, index) => (
                <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                    {row.sNo}
                </StyledTableCell>
                <StyledTableCell align="right" onClick = {() => qrgenerate(row.productId)}>Download</StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">{row.productId}</StyledTableCell>
                <StyledTableCell align="right">{row.status}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </Paper>
    );
}