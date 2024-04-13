import { Box, Card, CardContent, CardMedia, Grid, Rating, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductsByFiltersAsync, selectAllProducts } from '../productSlice';
import { ITEMS_PER_PAGE, discountedPrice } from '../../../app/contants';




export default function ProductList({ filterState, sortState, page }) {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);

    useEffect(() => {
        let pageState = {
            _page: page,
            _per_page: ITEMS_PER_PAGE
        }
        dispatch(fetchProductsByFiltersAsync({ filterState, sortState, pageState }));
    }, [filterState, sortState, page])


    const navigate = useNavigate();
    return (
        <Grid container spacing={2} sx={{ paddingLeft: "10px" }}>
            {products.length > 0 && products.map((product, index) => {
                return (<Grid key={product.id} item xs={12} sm={6} md={4}>
                    <Card onClick={() => {
                        navigate(`/product-details/${product.id}`);
                    }} sx={{ cursor: "pointer" }}>
                        <CardMedia
                            sx={{ height: "300px" }}
                            image={product.thumbnail}
                            title={product.title}
                        />
                        <CardContent>
                            <Stack justifyContent={'space-between'} alignContent={'center'} direction={'row'}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.title}
                                </Typography>
                                <Typography variant='body1' sx={{ margin: "auto 0px" }}>

                                    ${discountedPrice(product?.price, product?.discountPercentage)}
                                </Typography>
                            </Stack>
                            <Stack justifyContent={'space-between'} direction={'row'}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
                                    <Rating name="half-rating-read" defaultValue={product?.rating} precision={0.5} readOnly />
                                    <Typography variant='body' sx={{ marginLeft: "3px", marginTop: "3px" }}>
                                        {product.rating}
                                    </Typography>
                                </Box>
                                <Typography variant='body2' sx={{ textDecoration: 'line-through' }}>
                                    ${product.price}
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>)
            })}

        </Grid>
    )
}
