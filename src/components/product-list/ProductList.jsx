import { Card, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material';
import React from 'react'

const products = [
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 2,
        name: 'Basic Tee',
        href: '#',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 3,
        name: 'Basic Tee',
        href: '#',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
];

export default function ProductList() {
    return (
        <Grid container spacing={2} sx={{ paddingLeft: "10px" }}>
            {products.map((product, index) => {
                return (<Grid key={index} item xs={12} sm={6} md={4}>
                    <Card>
                        <CardMedia
                            sx={{ height: "300px" }}
                            image={product.imageSrc}
                            title={product.imageAlt}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.name}
                            </Typography>
                            <Stack justifyContent={'space-between'} direction={'row'}>
                                <Typography variant='body'>
                                    {product.color}
                                </Typography>
                                <Typography variant='body'>
                                    {product.price}
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>)
            })
            }
        </Grid>
    )
}
