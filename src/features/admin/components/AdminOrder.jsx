import { Box, Chip, IconButton, MenuItem, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { pageBackground } from '../../../utils/platfromThemes'
import styles from './AdminOrder.module.css'
import { ORDERS_PER_PAGE, discountedPrice } from '../../../app/contants';
import { useDispatch, useSelector } from 'react-redux';
import { allOrders, fetchAllOrdersAsync, orderTotalPages, updateOrderAsync } from '../../order/orderSlice';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useAlert } from 'react-alert'

const columns = [
    { id: 'orderId', value: "id", label: 'Order#', },
    { id: 'orderItems', label: 'Items', },
    { id: 'totalSum', value: "totalAmount", label: 'Total Amount', },
    { id: 'address', label: 'Shipping Address', },
    { id: 'orderStatus', label: 'Status', },
    { id: 'orderActions', label: 'Actions' }
]

const options = [
    { value: "pending", label: "Pending", color: "warning" },
    { value: "process", label: "In Process", color: "info" },
    { value: "dispached", label: "Dispached", color: "secondary" },
    { value: "delivered", label: "Delivered", color: "success" },
    { value: "cancel", label: "Cancel", color: "error" }
]

export default function AdminOrder() {
    const [page, setPage] = useState(1);
    const totalPages = useSelector(orderTotalPages);
    const dispatch = useDispatch();
    const totalOrders = useSelector(allOrders);
    const [editStatus, setEditStatus] = useState(null);
    const [changeStatus, setChangeStatus] = useState(null);
    const [asc, setAsc] = useState(true);
    const [attribute, setAttribute] = useState("id");
    const alert = useAlert()


    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        let pageState = {
            _page: page,
            _per_page: ORDERS_PER_PAGE
        }
        let sortState = {
            _sort: attribute,
            _order: (asc ? "asc" : "desc")
        }

        dispatch(fetchAllOrdersAsync({ sort: sortState, page: pageState }))
    }, [page, attribute, asc])

    function updateStatus(order, value) {
        let newOrder = { ...order };
        newOrder.status = value;
        dispatch(updateOrderAsync(newOrder));
    }

    function handleColor(value) {
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === value) {
                return options[i].color;
            }
        }
        return "info";
    }


    return (
        <Box sx={{ bgcolor: pageBackground }}>
            <Box className={styles.topBox} sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                <Typography variant='h5'>Your Orders</Typography>
            </Box>

            <Paper elevation={3} className={styles.paperComponent}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={"center"}
                                        onClick={() => {
                                            if (column.value) {
                                                setAttribute(column.value);
                                                setAsc(prev => !prev);
                                            }
                                        }}
                                    >
                                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            {column.label} {attribute === column.value && <>{(asc) ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}</>}</Box>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                totalOrders?.map((order, index) => {
                                    return (<TableRow key={`orderRow${index}`}>
                                        <TableCell align='center'>
                                            {order.id}
                                        </TableCell>
                                        <TableCell>
                                            <Stack spacing={1} justifyContent={'center'} alignContent={'center'}>
                                                {
                                                    order.items.map((item, itemIndex) => {
                                                        return (
                                                            <div key={`${item.id}-${index}-${itemIndex}`} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                                                                <img src={item.thumbnail} alt={item.title} height="64px" width="64px" style={{ marginRight: "10px", borderRadius: "8px" }} />
                                                                <p>{item.title} - #{item.quantity} - ${discountedPrice(item.price, item.discountPercentage)}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Stack>
                                        </TableCell>

                                        <TableCell align='center'>
                                            ${order.totalAmount}
                                        </TableCell>
                                        <TableCell align='center'>
                                            <div>{order.selectedAddress.name}</div>
                                            <div>{order.selectedAddress.street}</div>
                                            <div>{order.selectedAddress.city},{order.selectedAddress.state}-{order.selectedAddress.pinCode}</div>
                                            <div>{order.selectedAddress.phone}</div>
                                            <div></div>
                                        </TableCell>
                                        <TableCell align='center' sx={{ minWidth: "170px" }}>
                                            {editStatus !== order.id && <Chip label={order.status} color={handleColor(order.status)} />}
                                            {editStatus === order.id && <TextField
                                                select
                                                onChange={(e) => {
                                                    setChangeStatus(e.target.value);
                                                }}
                                                defaultValue={order.status}
                                                inputProps={{
                                                    sx: { padding: "7px 10px" }
                                                }}
                                                sx={{ marginTop: "4px" }}
                                            >
                                                {options.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>}
                                        </TableCell>
                                        <TableCell align='center' sx={{ minWidth: "160px" }}>
                                            {editStatus !== order.id && <IconButton onClick={() => {
                                                if (editStatus) {
                                                    alert.show("close other drop down");
                                                }
                                                else {
                                                    setEditStatus(order.id);
                                                }
                                            }}>
                                                <EditIcon />

                                            </IconButton>}
                                            {editStatus === order.id && <>
                                                <IconButton onClick={() => {
                                                    setEditStatus(null);
                                                    updateStatus(order, changeStatus)
                                                }}>
                                                    <CheckIcon />
                                                </IconButton>
                                                <IconButton onClick={() => {
                                                    setEditStatus(null);
                                                }} sx={{ marginLeft: "5px" }}>
                                                    <ClearIcon />
                                                </IconButton></>}
                                        </TableCell>
                                    </TableRow>)
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Stack spacing={2} direction={'row'} sx={{ width: "90%", margin: "15px auto", justifyContent: "space-between", alignItems: "center" }}>
                <Typography>Page: {page}</Typography>
                <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </Stack>
        </Box >
    )
}
