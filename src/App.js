import * as React from 'react';
import {
    Typography,
    CardMedia,
    CardContent,
    Card,
    CardActionArea,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    gridList: {
        width: '100%',
        height: 'auto',
    },
    card: {
        maxWidth: 160,
        height: '100%',
    },
}));

//

const tileData = [
    {
        img: 'https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg',
        title: 'title',
    },
    {
        img: 'https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg',
        title: 'title',
    },
    {
        img: 'https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg',
        title: 'title',
    },
    {
        img: 'https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg',
        title: 'title',
    },
    {
        img: 'https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg',
        title: 'title',
    },
    {
        img: 'https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg',
        title: 'title',
    },
    {
        img: 'https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg',
        title: 'title',
    },
    {
        img: 'https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg',
        title: 'title',
    },
    {
        img: 'https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg',
        title: 'title',
    },
    {
        img: 'https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg',
        title: 'title',
    },
    {
        img: 'https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg',
        title: 'title',
    },
    {
        img: 'https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg',
        title: 'title',
    },
    {
        img: 'https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg',
        title: 'title',
    },
    {
        img: 'https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg',
        title: 'title',
    },
    {
        img: 'https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg',
        title: 'title',
    },
    {
        img: 'https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg',
        title: 'title',
    },
    {
        img: 'https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg',
        title: 'title',
    },
    {
        img: 'https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg',
        title: 'title',
    },
];

export default function App() {
    const classes = useStyles();
    return (
        <div className="App">
            {tileData.map((tile, index) => (
                <Card className={classes.card} key={index}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="160"
                            image={'' + tile.img}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="body2"
                                component="h2"
                                noWrap
                            >
                                {tile.title}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    );
}
