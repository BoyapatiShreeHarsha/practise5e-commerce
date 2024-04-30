import { Box, Card, CardContent, CardMedia, Grid, Rating, Skeleton, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductsByFiltersAsync, selectAllProducts, selectLoading } from '../productSlice';
import { ITEMS_PER_PAGE, discountedPrice } from '../../../app/contants';




export default function ProductList({ filterState, sortState, page }) {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const loading = useSelector(selectLoading);

    useEffect(() => {
        let pageState = {
            _page: page,
            _per_page: ITEMS_PER_PAGE
        }
        let adminState = { admin: false };
        dispatch(fetchProductsByFiltersAsync({ filterState, sortState, pageState, adminState }));
    }, [filterState, sortState, page])


    const navigate = useNavigate();
    return (
        <Grid container spacing={2} sx={{ paddingLeft: "10px" }}>
            {loading === 'loading' && new Array(ITEMS_PER_PAGE).fill(null).map((_, index) => {
                return (<Grid key={index} item xs={12} sm={6} md={4}>
                    <Card >
                        <Box sx={{ height: "300px", padding: "10px", boxSizing: "border-box" }}>
                            <Skeleton variant="rounded" sx={{ height: "100%", width: "100%", }} />
                        </Box>
                        <CardContent>
                            <Stack justifyContent={'space-between'} alignContent={'center'} direction={'row'}>
                                <Skeleton variant="rounded" sx={{ width: "57%" }} />
                                <Skeleton variant="rounded" sx={{ width: "23%" }} />

                            </Stack>
                            <Stack justifyContent={'space-between'} direction={'row'} sx={{ marginTop: "10px" }}>
                                <Skeleton variant="rounded" sx={{ width: "50%" }} />
                                <Skeleton variant="rounded" sx={{ width: "30%" }} />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>)
            })}
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
