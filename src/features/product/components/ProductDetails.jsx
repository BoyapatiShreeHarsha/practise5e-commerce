import { Box, Breadcrumbs, Button, FormControl, FormControlLabel, FormLabel, Grid, ImageList, ImageListItem, Link, Paper, Radio, RadioGroup, Rating, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Navbar from '../../navbar/components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import styles from './ProductDetails.module.css'
import { borderColor } from '../../../utils/platfromThemes'
import { useParams } from 'react-router-dom'
import { fetchProductAsync, selectProduct } from '../productSlice';
import { addToCartAsync, selectCartItems } from '../../cart/cartSlice';
import { selectLoggedInUserId } from '../../auth/authSlice';


let highlights = [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
]

let colors = [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
]
let sizes = [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
]
const reviews = { href: '#', average: 4, totalCount: 117 }


export default function ProductDetails() {
    const [Color, setColor] = useState(colors?.[0]?.name)
    const params = useParams();
    const product = useSelector(selectProduct);
    const cartItems = useSelector(selectCartItems);

    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUserId);
    const handleChangeColor = (event) => {
        setColor(event.target.value);
    };
    function firstAvailable() {
        let index = 0;
        for (let obj of sizes) {
            if (obj.inStock) {
                return index;
            }
            index++;
        }

    }
    let firstIndex = firstAvailable();

    useEffect(() => {
        let id = params.id;
        dispatch(fetchProductAsync({ id }));
    }, [params.id])

    function handleAddBtn() {
        if (product.id && user) {
            for (let i = 0; i < cartItems.length; i++) {
                if (+cartItems[i].productId == product.id) {
                    alert("This Product is already present")
                    return;
                }
            }
            let newProduct = { ...product };
            delete newProduct.id;
            dispatch(addToCartAsync({ ...newProduct, productId: product.id, quantity: 1, user }))
        }
    }


    const [selectSize, setselectSize] = useState(sizes?.[firstIndex]?.name);
    return (
        <Box sx={{ bgcolor: "rgb(243 244 246)", height: "100vh" }}>
            <Navbar />
            <Paper elevation={3} sx={{ padding: "24px", width: "100%" }}>
                <Typography variant="h5" sx={{ fontWeight: "700" }}>E-Commerce</Typography>
            </Paper>
            <Paper elevation={3} className={styles.paperComponent}>
                {/* breadcrumbs */}
                <Breadcrumbs aria-label="breadcrumb">
                    {product.breadcrumbs?.map((obj, index) => {
                        return (
                            <Link key={obj.id} underline="hover" color="inherit" href={obj.href}>
                                {obj.name}
                            </Link>
                        )
                    })}
                    <Typography color="text.primary">{product.title}</Typography>
                </Breadcrumbs>
                {/* image collape */}
                <ImageList variant="masonry" cols={3} gap={8} sx={{ marginTop: "20px" }}>
                    {product?.images?.map((item, index) => (
                        <ImageListItem key={index}>
                            <img
                                srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item}?w=248&fit=crop&auto=format`}
                                alt={product.title}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
                {/* info box */}
                <Typography variant='h5' gutterBottom>
                    {product?.title}
                </Typography>
                <Stack direction={{ xs: 'column-reverse', md: 'row' }} spacing={2}>
                    <Box sx={{ flexBasis: 0, flexGrow: 3 }}>
                        <Typography variant='h6' gutterBottom>
                            {product.description}
                        </Typography>
                        <Typography variant='h6'>
                            Highlights
                        </Typography>
                        <ul style={{ margin: "10px 0px" }}>
                            {
                                highlights?.map((list, index) => {
                                    return (
                                        <li key={`${list}${index}`} ><Typography variant='body2'>
                                            {list}
                                        </Typography></li>
                                    )
                                })
                            }
                        </ul>
                        <Typography variant='h6' gutterBottom>Details</Typography>
                        <Typography variant='body'>
                            {product.details}
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: "none", md: "block", borderLeft: `1px solid ${borderColor}` } }}></Box>
                    <Box sx={{ flexBasis: 0, flexGrow: 2 }}>
                        <Typography variant='h5' gutterBottom>
                            $ {Math.round((1 - ((product?.discountPercentage) / 100)) * product?.price)}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", marginBottom: "10px" }}>
                            <Rating name="half-rating-read" defaultValue={product?.rating} precision={0.5} readOnly />
                            <Typography variant='body' sx={{ marginLeft: "10px" }}>{reviews?.totalCount} reviews</Typography>
                        </Box>
                        <FormControl>
                            <Typography variant='h6' gutterBottom>Color</Typography>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={Color}
                                onChange={handleChangeColor}

                            >
                                {
                                    colors?.map((obj, index) => {
                                        return (
                                            <FormControlLabel key={`color${index}`} value={obj?.name} control={<Radio />} label={obj?.name} />
                                        )
                                    })
                                }

                            </RadioGroup>
                        </FormControl>

                        <Typography variant='h6' gutterBottom>Size</Typography>
                        <Grid container spacing={2}>
                            {
                                sizes?.map((obj, index) => {
                                    return (<Grid key={`${obj.name}${index}`} item xs={3} onClick={() => {
                                        setselectSize(obj.name)
                                    }} >
                                        <Box className={!obj.inStock ? `${styles.sizeBox} ${styles.disabled}` : selectSize === obj.name ? `${styles.sizeBox} ${styles.selected}` : `${styles.sizeBox}`}>
                                            {obj.name}
                                        </Box>
                                    </Grid>)
                                })
                            }
                        </Grid>
                        <Button onClick={handleAddBtn} variant='contained' sx={{ margin: "15px", width: "100%" }}>Add to Cart</Button>
                    </Box>
                </Stack>
            </Paper>
        </Box>

    )
}
