import React, { useState, useEffect } from 'react'
import Navbar from "../features/navbar/components/Navbar"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, FormControlLabel, IconButton, Menu, MenuItem, Pagination, Paper, Stack, Typography } from '@mui/material'
import styles from "./Home.module.css"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { rowDivider } from '../utils/muiCustomComponents';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductList from '../features/product/components/ProductList';
import CloseIcon from '@mui/icons-material/Close';
import { fetchAllBrandsAsync, fetchAllCategoriesAsync, selectBrands, selectCategories, selectPages } from '../features/product/productSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrUser } from '../features/user/userSlice';
import AdminProductList from '../features/admin/components/AdminProductList';
import { pageBackground } from '../utils/platfromThemes';


const sortingList = [
    { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
    { name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
    { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
]


export default function Home() {
    const [page, setPage] = useState(1);
    const [openFilter, setOpenFilter] = useState(false);
    const userData = useSelector(selectCurrUser);
    const dispatch = useDispatch();
    const [filters, setFilters] = useState([]);
    const categories = useSelector(selectCategories);
    const brands = useSelector(selectBrands);
    const totalPages = useSelector(selectPages);

    useEffect(() => {
        dispatch(fetchAllCategoriesAsync());
        dispatch(fetchAllBrandsAsync());
    }, []);

    useEffect(() => {
        let newCategories = categories?.map((obj) => {
            return { ...obj, checked: false };
        })

        let newBrands = brands?.map((obj) => {
            return { ...obj, checked: false };
        })

        let new_filters = [
            {
                id: 'category',
                name: 'Category',
                options: newCategories,
            },
            {
                id: 'brand',
                name: 'Brands',
                options: newBrands,
            },
        ];
        setFilters(new_filters);
    }, [categories, brands])


    const [filterState, setFilterState] = useState({});
    // for sort menu
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [sortState, setSortState] = useState({});

    function handleSortOpen(e) {
        setAnchorEl(e.currentTarget);
    }

    function handleSortClose() {
        setAnchorEl(null);
    }

    function handleSortingOptions(index) {
        // handle the order
        setSelectedIndex(index);
        let obj = {
            _sort: sortingList[index].sort,
            _order: sortingList[index].order
        }
        setSortState(obj);
        setAnchorEl(null);
    }



    // pagination

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        setPage(1);
    }, [filterState, sortState])


    // filters

    function handleFilter(state, category, index) {
        //change the value in our local data 


        for (let cat of filters) {
            if (cat.id === category) {

                cat.options[index].checked = state;
                let filterObj = { ...filterState };
                if (state) {
                    if (filterObj.hasOwnProperty(category)) {
                        filterObj[category].push(cat.options[index].value)
                    }
                    else {
                        filterObj[category] = [cat.options[index].value];
                    }
                }
                else {
                    let arr = filterObj[category].filter((val) => val !== cat.options[index].value);
                    if (arr.length) {
                        filterObj[category] = arr;
                    }
                    else {
                        delete filterObj[category];
                    }
                }

                setFilterState(prev => filterObj);
                break;
            }
        }
    }


    return (
        <Box sx={{ bgcolor: pageBackground, position: openFilter ? "fixed" : "relative" }}>
            <MobileFilter openFilter={openFilter} setOpenFilter={setOpenFilter} handleFilter={handleFilter} filters={filters} />
            <Navbar />
            <Paper elevation={3} sx={{ padding: "24px", width: "100%" }}>
                <Typography variant="h5" sx={{ fontWeight: "700" }}>E-Commerce</Typography>
            </Paper>
            <Box sx={{ paddingBottom: "10px" }}>
                <Paper elevation={3} className={styles.paperComponent}>
                    {/* Top section */}
                    <TopBar handleSortOpen={handleSortOpen} anchorEl={anchorEl} handleSortClose={handleSortClose} selectedIndex={selectedIndex} handleSortingOptions={handleSortingOptions} setOpenFilter={setOpenFilter} />
                    {rowDivider({ node: { margin: "20px 0px" } })}
                    {/* middle section */}
                    <Box className={styles.middleBox}>
                        <DesktopFilter handleFilter={handleFilter} filterState={filterState} filters={filters} />
                        {/* main products display */}
                        {userData?.role === 'user' && <Box sx={{ flexGrow: 7 }}><ProductList filterState={filterState} sortState={sortState} page={page} /></Box>}
                        {userData?.role === 'admin' && <Box sx={{ flexGrow: 7 }}><AdminProductList filterState={filterState} sortState={sortState} page={page} /></Box>}
                    </Box>
                    {/* bottom section */}
                    {rowDivider({ node: { margin: "20px 0px" } })}
                    <Stack justifyContent={'space-between'} direction={'row'}>
                        <Typography>Page: {page}</Typography>
                        <Pagination count={totalPages} page={page} onChange={handlePageChange} />
                    </Stack>
                </Paper>
            </Box>
        </Box >
    )
}




function MobileFilter({ openFilter, setOpenFilter, handleFilter, filters }) {
    return (
        <Box className={`${styles.filterBar} ${openFilter ? styles.open : ""}`}>
            <Stack justifyContent={'space-between'} alignContent={'center'} sx={{ padding: "3% 2%" }} direction={'row'}>
                <Typography variant='h4'>
                    Fliters
                </Typography>
                <IconButton onClick={() => {
                    setOpenFilter(prev => false)
                }}>
                    <CloseIcon />
                </IconButton>
            </Stack>
            {rowDivider()}
            {rowDivider()}
            {
                filters.map((filter, index) => {
                    return (
                        <Accordion key={filter.id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"

                            >
                                {filter.name}
                            </AccordionSummary>
                            <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
                                {
                                    filter.options.map((obj, index) => {
                                        return (<FormControlLabel key={`${obj.value}-${index}`} control={<Checkbox
                                            checked={obj.checked}
                                            onChange={(e) => {
                                                handleFilter(e.target.checked, filter.id, index)
                                            }}
                                        />} label={obj.label} />)
                                    })
                                }
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            }
        </Box>
    )
}

function DesktopFilter({ handleFilter, filters }) {
    return (
        <Box sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 1 }}>
            {
                filters.map((filter, index) => {
                    return (
                        <Accordion key={filter.id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"

                            >
                                {filter.name}
                            </AccordionSummary>
                            <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
                                {
                                    filter.options.map((obj, index) => {
                                        return (<FormControlLabel key={`${obj.value}-${index}`} control={<Checkbox
                                            checked={obj.checked}
                                            onChange={(e) => {
                                                handleFilter(e.target.checked, filter.id, index)
                                            }}
                                        />} label={obj.label} />)
                                    })
                                }
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            }

        </Box>
    )
}

function TopBar({ handleSortOpen, anchorEl, handleSortClose, selectedIndex, handleSortingOptions, setOpenFilter }) {
    return (
        <Box className={styles.topBox}>
            <Typography variant='h6'>All Products</Typography>
            <Box className={styles.IconBox}>

                <Button variant="text" endIcon={<KeyboardArrowDownIcon />} onClick={handleSortOpen}>Sort</Button>
                <Menu
                    id="sort-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleSortClose}
                    MenuListProps={{
                        'aria-labelledby': 'lock-button',
                        role: 'listbox',
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    {sortingList.map((obj, index) => (
                        <MenuItem
                            key={`${obj.name}-${index}`}
                            selected={index === selectedIndex}
                            onClick={(event) => handleSortingOptions(index)}
                        >
                            {obj.name}
                        </MenuItem>
                    ))}
                </Menu>

                <IconButton sx={{ display: { xs: 'block', sm: 'none' } }} onClick={() => {
                    setOpenFilter(prev => true)
                }}>
                    <FilterAltIcon />
                </IconButton>
            </Box>
        </Box>
    )
}
