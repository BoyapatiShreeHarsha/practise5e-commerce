import { Box, Card, CardContent, CardMedia, Grid, Rating, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchProductsByFiltersAsync, selectAllProducts } from '../../product/productSlice';
import { ITEMS_PER_PAGE } from '../../../app/contants';
import { customButton } from '../../../utils/muiCustomComponents';




export default function AdminProductList({ filterState, sortState, page }) {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);

    useEffect(() => {
        let pageState = {
            _page: page,
            _per_page: ITEMS_PER_PAGE
        }
        let adminState = { admin: true };
        dispatch(fetchProductsByFiltersAsync({ filterState, sortState, pageState, adminState }));
    }, [filterState, sortState, page])


    const navigate = useNavigate();
    return (
        <>
            <Link to={"/admin/product-form"}>
                {customButton({
                    propsToBePassed: {
                        variant: "contained",
                        color: "success",
                        sx: { marginLeft: "10px", marginBottom: "10px" }
                    },
                    label: "Add new Product",
                    id: "addNewProduct"
                })}
            </Link>
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
                                        ${Math.round(product?.price * ((100 - product?.discountPercentage) / 100))}
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
                                {product.delete && <p style={{ color: "red" }}>Product is deleted</p>}
                            </CardContent>
                        </Card>
                        {/* need to do */}
                        <Link to={`/admin/edit-product-from/${product.id}`}>
                            {customButton({
                                propsToBePassed: {
                                    variant: "contained",
                                    sx: { marginTop: "10px" }
                                },
                                label: "Edit Product",
                                id: `EditProductBtn-${product.id}`
                            })}
                        </Link>
                    </Grid>)
                })}

            </Grid>
        </>
    )
}
