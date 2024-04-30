import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form"
import styles from '../../../pages/Checkout.module.css'
import { Button, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { customTextFeild, rowDivider } from '../../../utils/muiCustomComponents'
import { clearSelectedProduct, createProductAsync, fetchProductAsync, selectBrands, selectCategories, selectProduct, updateProductAsync } from '../../product/productSlice';
import { useParams, useNavigate } from 'react-router-dom'
import CustomModal from '../../../utils/CustomModal';
import { useAlert } from 'react-alert'


function ProductForm() {

    const categories = useSelector(selectCategories);
    const brands = useSelector(selectBrands);
    const params = useParams();
    const navigate = useNavigate();
    const alert = useAlert()

    const oldProduct = useSelector(selectProduct);

    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const funcSubmit = (data) => {
        if (!brand) {
            alert.error("Brand should be selected");
            return;
        }
        if (!category) {
            alert.error("Category should be selected");
            return;
        }
        data.images = [data.image1, data.image2, data.image3];
        delete data.image1;
        delete data.image2;
        delete data.image3;
        data.price = +data.price;
        data.discountPercentage = +data.discountPercentage;
        data.stock = +data.stock;
        data.rating = oldProduct?.rating ? oldProduct?.rating : 0;
        data.brand = brand;
        data.category = category;
        let product = { ...data };
        product.delete = false;
        if (!params.id) {
            dispatch(createProductAsync(product));
            reset();
            setCategory("");
            setBrand("");
            navigate("/");
        }
        else {
            product.id = params.id;
            dispatch(updateProductAsync(product));
            reset();
            setCategory("");
            setBrand("");
            navigate("/");
        }


    }

    function handleProductDelete() {
        let product = { ...oldProduct };
        product.delete = true;
        dispatch(updateProductAsync(product));
        navigate("/");
    }

    useEffect(() => {
        if (params.id) {
            dispatch(fetchProductAsync({ id: params.id }));
        }
        else {
            dispatch(clearSelectedProduct());
        }
    }, [params.id])

    useEffect(() => {
        if (oldProduct && params.id) {
            setValue('description', oldProduct.description);
            setValue('discountPercentage', oldProduct.discountPercentage);
            setValue('price', oldProduct.price);
            setValue('stock', oldProduct.stock);
            setValue('thumbnail', oldProduct.thumbnail);
            setValue('title', oldProduct.title);
            setValue('image1', (oldProduct?.images && oldProduct?.images[0]) ? oldProduct.images[0] : oldProduct?.thumbnail);
            setValue('image2', (oldProduct?.images && oldProduct?.images[1]) ? oldProduct.images[1] : oldProduct?.thumbnail);
            setValue('image3', (oldProduct?.images && oldProduct?.images[2]) ? oldProduct.images[2] : oldProduct?.thumbnail);
            setCategory(oldProduct?.category);
            setBrand(oldProduct?.brand);
        }
    }, [oldProduct, params.id])




    return (
        <Box >
            <form noValidate style={{ width: "100%" }} onSubmit={handleSubmit(funcSubmit)}>
                <Stack spacing={5} alignItems={'flex-start'}>
                    <Box className={`${styles.box1} ${styles.box}`}>
                        <Box className={styles.formChild} sx={{ flexGrow: 1 }}>
                            <label htmlFor='title' >
                                <Typography variant='body' gutterBottom>
                                    Title:
                                </Typography></label>
                            {customTextFeild({ id: "title", variant: "outlined", sx: { width: "90%" }, ...register("title", { required: "Title is required" }) })}
                            {errors.title?.message && <p style={{ color: "red" }}>{errors.title.message}</p>}
                        </Box>
                    </Box>
                    <Box className={`${styles.box1} ${styles.box}`}>
                        <Box className={styles.formChild} sx={{ flexGrow: 1 }}>
                            <label htmlFor='description' >
                                <Typography variant='body' gutterBottom>
                                    Description:
                                </Typography></label>
                            {customTextFeild({ id: "description", variant: "outlined", sx: { width: "90%" }, ...register("description", { required: "Description is required" }), multiline: true, maxRows: 4 })}
                            {errors.description?.message && <p style={{ color: "red" }}>{errors.description.message}</p>}
                        </Box>
                    </Box>
                    <Box className={`${styles.box1} ${styles.box}`}>
                        <Box className={styles.formChild} sx={{ flexGrow: 1 }}>
                            <label htmlFor='category' >
                                <Typography variant='body' gutterBottom>
                                    Category:
                                </Typography></label>
                            <TextField
                                select
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                }}
                                value={category}
                                inputProps={{
                                    sx: { padding: "7px 10px" }
                                }}
                                sx={{ marginTop: "4px" }}
                            >
                                {categories.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>

                        <Box className={styles.formChild} sx={{ flexGrow: 1 }}>
                            <label htmlFor='brand' >
                                <Typography variant='body' gutterBottom>
                                    Brands:
                                </Typography></label>
                            <TextField
                                select
                                onChange={(e) => {
                                    setBrand(e.target.value);
                                }}
                                value={brand}
                                inputProps={{
                                    sx: { padding: "7px 10px" }
                                }}
                                sx={{ marginTop: "4px" }}

                            >
                                {brands.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Box>
                    <Box className={`${styles.box1} ${styles.box}`}>
                        <Box className={styles.formChild} sx={{ flexGrow: 1 }}>
                            <label htmlFor='thumbnail' >
                                <Typography variant='body' gutterBottom>
                                    Thumbnail:
                                </Typography></label>
                            {customTextFeild({
                                id: "thumbnail", variant: "outlined", sx: { width: "90%" }, ...register("thumbnail", {
                                    required: "Thumbnail is required", validate: (value) => {
                                        try {
                                            let obj = new URL(value);
                                            return;
                                        } catch (error) {
                                            return "It should be a url"
                                        }
                                    }
                                })
                            })}
                            {errors.thumbnail?.message && <p style={{ color: "red" }}>{errors.thumbnail.message}</p>}
                        </Box>
                    </Box>
                    <Box className={`${styles.box1} ${styles.box}`}>
                        <Box className={styles.formChild} sx={{ flexGrow: 1 }}>
                            <label htmlFor='image1' >
                                <Typography variant='body' gutterBottom>
                                    Image 1:
                                </Typography></label>
                            {customTextFeild({
                                id: "image1", variant: "outlined", sx: { width: "90%" }, ...register("image1", {
                                    required: "Image 1 is required", validate: (value) => {
                                        try {
                                            let obj = new URL(value);
                                            return;
                                        } catch (error) {
                                            return "It should be a url"
                                        }
                                    }
                                })
                            })}
                            {errors.image1?.message && <p style={{ color: "red" }}>{errors.image1.message}</p>}
                        </Box>
                    </Box>
                    <Box className={`${styles.box1} ${styles.box}`}>
                        <Box className={styles.formChild} sx={{ flexGrow: 1 }}>
                            <label htmlFor='image2' >
                                <Typography variant='body' gutterBottom>
                                    Image 2:
                                </Typography>
                            </label>
                            {customTextFeild({
                                id: "image2", variant: "outlined", sx: { width: "90%" }, ...register("image2", {
                                    required: "Image 2 is required", validate: (value) => {
                                        try {
                                            let obj = new URL(value);
                                            return;
                                        } catch (error) {
                                            return "It should be a url"
                                        }
                                    }
                                })
                            })}
                            {errors.image2?.message && <p style={{ color: "red" }}>{errors.image2.message}</p>}
                        </Box>
                    </Box>
                    <Box className={`${styles.box1} ${styles.box}`}>
                        <Box className={styles.formChild} sx={{ flexGrow: 1 }}>
                            <label htmlFor='image3' >
                                <Typography variant='body' gutterBottom>
                                    Image 3:
                                </Typography></label>
                            {customTextFeild({
                                id: "image3", variant: "outlined", sx: { width: "90%" }, ...register("image3", {
                                    required: "Image 3 is required", validate: (value) => {
                                        try {
                                            let obj = new URL(value);
                                            return;
                                        } catch (error) {
                                            return "It should be a url"
                                        }
                                    }
                                })
                            })}
                            {errors.image3?.message && <p style={{ color: "red" }}>{errors.image3.message}</p>}
                        </Box>
                    </Box>
                    <Box className={`${styles.box}`}>
                        <Box className={styles.formChild}>
                            <label htmlFor='price' >
                                <Typography variant='body' gutterBottom>
                                    Price:
                                </Typography></label>
                            {customTextFeild({
                                id: "price", variant: "outlined", type: "number", sx: { width: "60%" }, ...register("price", {
                                    required: "Price is required", validate: (value) => {
                                        if (value > 0) {
                                            return;
                                        }
                                        else {
                                            return "Price should be positive"
                                        }
                                    }
                                })
                            })}
                            {errors.price?.message && <p style={{ color: "red" }}>{errors.price.message}</p>}
                        </Box>
                        <Box className={styles.formChild}>
                            <label htmlFor='discountPercentage' >
                                <Typography variant='body' gutterBottom>
                                    Discount Percentage:
                                </Typography></label>
                            {customTextFeild({
                                id: "discountPercentage", variant: "outlined", type: "number", sx: { width: "60%" }, ...register("discountPercentage", {
                                    required: "DiscountPercentage is required", validate: (value) => {
                                        if (value >= 0 && value <= 100) {
                                            return;
                                        }
                                        else {
                                            return "Discount should be in Percentage"
                                        }
                                    }
                                })
                            })}
                            {errors.discountPercentage?.message && <p style={{ color: "red" }}>{errors.discountPercentage.message}</p>}
                        </Box>
                        <Box className={styles.formChild}>
                            <label htmlFor='stock' >
                                <Typography variant='body' gutterBottom>
                                    Stock:
                                </Typography></label>
                            {customTextFeild({
                                id: "stock", variant: "outlined", type: "number", sx: { width: "60%" }, ...register("stock", { required: "Stock is required" }), validate: (value) => {
                                    if (value >= 1) {
                                        return;
                                    }
                                    else {
                                        return "Stock should be positive"
                                    }
                                }
                            })}
                            {errors.stock?.message && <p style={{ color: "red" }}>{errors.stock.message}</p>}
                        </Box>
                    </Box>
                </Stack>
                {rowDivider({ node: { margin: "20px 0px" } })}

                <Stack spacing={2} justifyContent={'flex-end'} direction={'row'} alignItems={'center'}>
                    <Button type="reset" variant="text">Reset</Button>
                    <Button type="submit" variant="contained">{params.id ? "Edit" : "Add"} Product</Button>
                    {params.id && !oldProduct?.delete && <Button variant='contained' color='error' onClick={() => setOpenModal(true)}>Delete</Button>}
                    {
                        openModal && <CustomModal title={"Delete Product"} message={"Do you want to delete this product?"} cancelName="Cancel" cancelFunction={() => {
                            setOpenModal(false);
                        }} saveName="Delete" saveFunction={() => {
                            setOpenModal(false);
                            handleProductDelete();
                        }} color="error" />
                    }
                </Stack>

            </form>
        </Box>
    )
}


export default ProductForm;
