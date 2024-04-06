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
import { ITEMS_PER_PAGE } from '../app/contants';
import { selectTotalItems } from '../features/product/productSlice';
import { useSelector } from 'react-redux';


const sortingList = [
    { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
    { name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
    { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
]

const filters = [
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'smartphones', label: 'smartphones', checked: false },
            { value: 'laptops', label: 'laptops', checked: false },
            { value: 'fragrances', label: 'fragrances', checked: false },
            { value: 'skincare', label: 'skincare', checked: false },
            { value: 'groceries', label: 'groceries', checked: false },
            { value: 'home-decoration', label: 'home decoration', checked: false },
            { value: 'furniture', label: 'furniture', checked: false },
            { value: 'tops', label: 'tops', checked: false },
            { value: 'womens-dresses', label: 'womens dresses', checked: false },
            { value: 'womens-shoes', label: 'womens shoes', checked: false },
            { value: 'mens-shirts', label: 'mens shirts', checked: false },
            { value: 'mens-shoes', label: 'mens shoes', checked: false },
            { value: 'mens-watches', label: 'mens watches', checked: false },
            { value: 'womens-watches', label: 'womens watches', checked: false },
            { value: 'womens-bags', label: 'womens bags', checked: false },
            { value: 'womens-jewellery', label: 'womens jewellery', checked: false },
            { value: 'sunglasses', label: 'sunglasses', checked: false },
            { value: 'automotive', label: 'automotive', checked: false },
            { value: 'motorcycle', label: 'motorcycle', checked: false },
            { value: 'lighting', label: 'lighting', checked: false },
        ],
    },
    {
        id: 'brand',
        name: 'Brands',
        options: [
            { value: 'Apple', label: 'Apple', checked: false },
            { value: 'Samsung', label: 'Samsung', checked: false },
            { value: 'OPPO', label: 'OPPO', checked: false },
            { value: 'Huawei', label: 'Huawei', checked: false },
            {
                value: 'Microsoft Surface',
                label: 'Microsoft Surface',
                checked: false,
            },
            { value: 'Infinix', label: 'Infinix', checked: false },
            { value: 'HP Pavilion', label: 'HP Pavilion', checked: false },
            {
                value: 'Impression of Acqua Di Gio',
                label: 'Impression of Acqua Di Gio',
                checked: false,
            },
            { value: 'Royal_Mirage', label: 'Royal_Mirage', checked: false },
            {
                value: 'Fog Scent Xpressio',
                label: 'Fog Scent Xpressio',
                checked: false,
            },
            { value: 'Al Munakh', label: 'Al Munakh', checked: false },
            { value: 'Lord - Al-Rehab', label: 'Lord   Al Rehab', checked: false },
            { value: "L'Oreal Paris", label: "L'Oreal Paris", checked: false },
            { value: 'Hemani Tea', label: 'Hemani Tea', checked: false },
            { value: 'Dermive', label: 'Dermive', checked: false },
            { value: 'ROREC White Rice', label: 'ROREC White Rice', checked: false },
            { value: 'Fair & Clear', label: 'Fair & Clear', checked: false },
            { value: 'Saaf & Khaas', label: 'Saaf & Khaas', checked: false },
            { value: 'Bake Parlor Big', label: 'Bake Parlor Big', checked: false },
            {
                value: 'Baking Food Items',
                label: 'Baking Food Items',
                checked: false,
            },
            { value: 'fauji', label: 'fauji', checked: false },
            { value: 'Dry Rose', label: 'Dry Rose', checked: false },
            { value: 'Boho Decor', label: 'Boho Decor', checked: false },
            { value: 'Flying Wooden', label: 'Flying Wooden', checked: false },
            { value: 'LED Lights', label: 'LED Lights', checked: false },
            { value: 'luxury palace', label: 'luxury palace', checked: false },
            { value: 'Golden', label: 'Golden', checked: false },
            {
                value: 'Furniture Bed Set',
                label: 'Furniture Bed Set',
                checked: false,
            },
            { value: 'Ratttan Outdoor', label: 'Ratttan Outdoor', checked: false },
            { value: 'Kitchen Shelf', label: 'Kitchen Shelf', checked: false },
            { value: 'Multi Purpose', label: 'Multi Purpose', checked: false },
            { value: 'AmnaMart', label: 'AmnaMart', checked: false },
            {
                value: 'Professional Wear',
                label: 'Professional Wear',
                checked: false,
            },
            { value: 'Soft Cotton', label: 'Soft Cotton', checked: false },
            { value: 'Top Sweater', label: 'Top Sweater', checked: false },
            {
                value: 'RED MICKY MOUSE..',
                label: 'RED MICKY MOUSE..',
                checked: false,
            },
            { value: 'Digital Printed', label: 'Digital Printed', checked: false },
            { value: 'Ghazi Fabric', label: 'Ghazi Fabric', checked: false },
            { value: 'IELGY', label: 'IELGY', checked: false },
            { value: 'IELGY fashion', label: 'IELGY fashion', checked: false },
            {
                value: 'Synthetic Leather',
                label: 'Synthetic Leather',
                checked: false,
            },
            {
                value: 'Sandals Flip Flops',
                label: 'Sandals Flip Flops',
                checked: false,
            },
            { value: 'Maasai Sandals', label: 'Maasai Sandals', checked: false },
            { value: 'Arrivals Genuine', label: 'Arrivals Genuine', checked: false },
            { value: 'Vintage Apparel', label: 'Vintage Apparel', checked: false },
            { value: 'FREE FIRE', label: 'FREE FIRE', checked: false },
            { value: 'The Warehouse', label: 'The Warehouse', checked: false },
            { value: 'Sneakers', label: 'Sneakers', checked: false },
            { value: 'Rubber', label: 'Rubber', checked: false },
            { value: 'Naviforce', label: 'Naviforce', checked: false },
            { value: 'SKMEI 9117', label: 'SKMEI 9117', checked: false },
            { value: 'Strap Skeleton', label: 'Strap Skeleton', checked: false },
            { value: 'Stainless', label: 'Stainless', checked: false },
            { value: 'Eastern Watches', label: 'Eastern Watches', checked: false },
            { value: 'Luxury Digital', label: 'Luxury Digital', checked: false },
            { value: 'Watch Pearls', label: 'Watch Pearls', checked: false },
            { value: 'Bracelet', label: 'Bracelet', checked: false },
            { value: 'LouisWill', label: 'LouisWill', checked: false },
            { value: 'Copenhagen Luxe', label: 'Copenhagen Luxe', checked: false },
            { value: 'Steal Frame', label: 'Steal Frame', checked: false },
            { value: 'Darojay', label: 'Darojay', checked: false },
            {
                value: 'Fashion Jewellery',
                label: 'Fashion Jewellery',
                checked: false,
            },
            { value: 'Cuff Butterfly', label: 'Cuff Butterfly', checked: false },
            {
                value: 'Designer Sun Glasses',
                label: 'Designer Sun Glasses',
                checked: false,
            },
            { value: 'mastar watch', label: 'mastar watch', checked: false },
            { value: 'Car Aux', label: 'Car Aux', checked: false },
            { value: 'W1209 DC12V', label: 'W1209 DC12V', checked: false },
            { value: 'TC Reusable', label: 'TC Reusable', checked: false },
            { value: 'Neon LED Light', label: 'Neon LED Light', checked: false },
            {
                value: 'METRO 70cc Motorcycle - MR70',
                label: 'METRO 70cc Motorcycle   MR70',
                checked: false,
            },
            { value: 'BRAVE BULL', label: 'BRAVE BULL', checked: false },
            { value: 'shock absorber', label: 'shock absorber', checked: false },
            { value: 'JIEPOLLY', label: 'JIEPOLLY', checked: false },
            { value: 'Xiangle', label: 'Xiangle', checked: false },
            {
                value: 'lightingbrilliance',
                label: 'lightingbrilliance',
                checked: false,
            },
            { value: 'Ifei Home', label: 'Ifei Home', checked: false },
            { value: 'DADAWU', label: 'DADAWU', checked: false },
            { value: 'YIOSI', label: 'YIOSI', checked: false },
        ],
    },
];

export default function Home() {
    const [page, setPage] = useState(1);
    const [openFilter, setOpenFilter] = useState(false);
    const TOTAL_ITEMS = useSelector(selectTotalItems);

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
            // _order: sortingList[index].order
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
        <div>
            <Box sx={{ bgcolor: "rgb(243 244 246)", height: "100vh", position: openFilter ? "fixed" : "relative" }}>
                <MobileFilter openFilter={openFilter} setOpenFilter={setOpenFilter} handleFilter={handleFilter} />
                <Navbar />
                <Paper elevation={3} sx={{ padding: "24px", width: "100%" }}>
                    <Typography variant="h5" sx={{ fontWeight: "700" }}>E-Commerce</Typography>
                </Paper>
                <Paper elevation={3} className={styles.paperComponent}>
                    {/* Top section */}
                    <TopBar handleSortOpen={handleSortOpen} anchorEl={anchorEl} handleSortClose={handleSortClose} selectedIndex={selectedIndex} handleSortingOptions={handleSortingOptions} setOpenFilter={setOpenFilter} />
                    {rowDivider({ node: { margin: "20px 0px" } })}
                    {/* middle section */}
                    <Box className={styles.middleBox}>
                        <DesktopFilter handleFilter={handleFilter} filterState={filterState} />
                        {/* main products display */}
                        <Box sx={{ flexGrow: 7 }}><ProductList filterState={filterState} sortState={sortState} page={page} /></Box>
                    </Box>
                    {/* bottom section */}
                    {rowDivider({ node: { margin: "20px 0px" } })}
                    <Stack justifyContent={'space-between'} direction={'row'}>
                        <Typography>Page: {page}</Typography>
                        <Pagination count={Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE)} page={page} onChange={handlePageChange} />
                    </Stack>
                </Paper>
            </Box >
        </div >
    )
}




function MobileFilter({ openFilter, setOpenFilter, handleFilter }) {
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

function DesktopFilter({ handleFilter }) {
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
