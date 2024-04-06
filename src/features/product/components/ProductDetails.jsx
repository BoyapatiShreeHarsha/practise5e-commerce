import { Box, Breadcrumbs, Button, FormControl, FormControlLabel, FormLabel, Grid, ImageList, ImageListItem, Link, Paper, Radio, RadioGroup, Rating, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import Navbar from '../../navbar/components/Navbar'
import styles from './ProductDetails.module.css'
import { borderColor } from '../../../utils/platfromThemes'

const product = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }


export default function ProductDetails() {
    const [Color, setColor] = useState(product?.colors?.[0]?.name)
    const handleChangeColor = (event) => {
        setColor(event.target.value);
    };
    function firstAvailable() {
        let index = 0;
        for (let obj of product?.sizes) {
            if (obj.inStock) {
                return index;
            }
            index++;
        }

    }
    let firstIndex = firstAvailable();

    const [selectSize, setselectSize] = useState(product?.sizes?.[firstIndex]?.name);
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
                    <Typography color="text.primary">{product.name}</Typography>
                </Breadcrumbs>
                {/* image collape */}
                <ImageList variant="masonry" cols={3} gap={8} sx={{ marginTop: "20px" }}>
                    {product?.images?.map((item, index) => (
                        <ImageListItem key={index}>
                            <img
                                srcSet={`${item.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.src}?w=248&fit=crop&auto=format`}
                                alt={item.alt}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
                {/* info box */}
                <Typography variant='h5' gutterBottom>
                    {product?.name}
                </Typography>
                <Stack direction={{ xs: 'column-reverse', md: 'row' }} spacing={2}>
                    <Box sx={{ flexBasis: 0, flexGrow: 3 }}>
                        <Typography variant='h6' gutterBottom>
                            {product?.description}
                        </Typography>
                        <Typography variant='h6'>
                            Highlights
                        </Typography>
                        <ul style={{ margin: "10px 0px" }}>
                            {
                                product?.highlights?.map((list, index) => {
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
                            {product?.details}
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: "none", md: "block", borderLeft: `1px solid ${borderColor}` } }}></Box>
                    <Box sx={{ flexBasis: 0, flexGrow: 2 }}>
                        <Typography variant='h5' gutterBottom>
                            {product?.price}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", marginBottom: "10px" }}>
                            <Rating name="half-rating-read" defaultValue={reviews?.average} precision={0.5} readOnly />
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
                                    product?.colors?.map((obj, index) => {
                                        return (
                                            <FormControlLabel value={obj?.name} control={<Radio />} label={obj?.name} />
                                        )
                                    })
                                }

                            </RadioGroup>
                        </FormControl>

                        <Typography variant='h6' gutterBottom>Size</Typography>
                        <Grid container spacing={2}>
                            {
                                product?.sizes?.map((obj, index) => {
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
                        <Button variant='contained' sx={{ margin: "15px", width: "100%" }}>Add to Cart</Button>
                    </Box>
                </Stack>
            </Paper>
        </Box>

    )
}
