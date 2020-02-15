import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import tileData from './tileData';
import Card1 from "./../cards/productCard";
import Card2 from "./../cards/productCard2";
import Card3 from "./../cards/productCard3";
import Card4 from "./../cards/productCard4";



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function ImageGridList() {
  const classes = useStyles();

    return (
        <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
            <GridListTile  cols={1}>
                <Card1></Card1>
            </GridListTile>
        </GridList>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
            <GridListTile  cols={1}>
                <Card2></Card2>
            </GridListTile>
        </GridList>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
            <GridListTile  cols={1}>
                <Card3></Card3>
            </GridListTile>
        </GridList>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
            <GridListTile  cols={1}>
                <Card4></Card4>
            </GridListTile>
        </GridList>
        </div>
    );
}