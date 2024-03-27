import React, { useState } from 'react'
import Navbar from "../features/navbar/components/Navbar"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, FormControlLabel, IconButton, Menu, MenuItem, Pagination, Paper, Stack, Typography } from '@mui/material'
import styles from "./Home.module.css"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { rowDivider } from '../utils/muiCustomComponents';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductList from '../features/product-list/components/ProductList';
import CloseIcon from '@mui/icons-material/Close';


const sortingList = [
    "Most Popular",
    "Best Rating",
    "Newest"
]

const colorList = [
    "blue",
    "black",
    "red",
    "white",
    "yellow"
]

export default function Home() {
    // for sort menu
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    function handleSortOpen(e) {
        setAnchorEl(e.currentTarget);
    }

    function handleSortClose() {
        setAnchorEl(null);
    }

    function handleSortingOptions(index) {
        setSelectedIndex(index);
        setAnchorEl(null);
    }

    // pagination
    const [page, setPage] = useState(1);
    const handlePageChange = (value) => {
        setPage(value);
    };

    // filters

    const [openFilter, setOpenFilter] = useState(false);

    return (
        <div>
            <Box sx={{ bgcolor: "rgb(243 244 246)", height: "100vh", position: openFilter ? "fixed" : "relative" }}>
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
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"

                        >
                            Color
                        </AccordionSummary>
                        <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
                            {
                                colorList.map((color, index) => {
                                    return (<FormControlLabel key={index} control={<Checkbox />} label={color} />)
                                })
                            }
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"

                        >
                            Color
                        </AccordionSummary>
                        <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
                            {
                                colorList.map((color, index) => {
                                    return (<FormControlLabel key={index} control={<Checkbox defaultChecked />} label={color} />)
                                })
                            }
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"

                        >
                            Color
                        </AccordionSummary>
                        <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
                            {
                                colorList.map((color, index) => {
                                    return (<FormControlLabel key={index} control={<Checkbox defaultChecked />} label={color} />)
                                })
                            }
                        </AccordionDetails>
                    </Accordion>
                </Box>
                <Navbar />
                <Paper elevation={3} sx={{ padding: "24px", width: "100%" }}>
                    <Typography variant="h5" sx={{ fontWeight: "700" }}>E-Commerce</Typography>
                </Paper>
                <Paper elevation={3} className={styles.paperComponent}>
                    {/* Top section */}
                    <Box className={styles.topBox}>
                        <Typography variant='h6'>All Products</Typography>
                        <Box className={styles.IconBox}>

                            <Button variant="text" endIcon={<KeyboardArrowDownIcon />} onClick={handleSortOpen}>Sort</Button>
                            <Menu
                                id="lock-menu"
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
                                {sortingList.map((option, index) => (
                                    <MenuItem
                                        key={option}
                                        selected={index === selectedIndex}
                                        onClick={(event) => handleSortingOptions(index)}
                                    >
                                        {option}
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
                    {rowDivider({ node: { margin: "20px 0px" } })}
                    {/* middle section */}
                    <Box className={styles.middleBox}>
                        <Box sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 1 }}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"

                                >
                                    Color
                                </AccordionSummary>
                                <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
                                    {
                                        colorList.map((color, index) => {
                                            return (<FormControlLabel key={index} control={<Checkbox />} label={color} />)
                                        })
                                    }
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"

                                >
                                    Color
                                </AccordionSummary>
                                <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
                                    {
                                        colorList.map((color, index) => {
                                            return (<FormControlLabel key={index} control={<Checkbox defaultChecked />} label={color} />)
                                        })
                                    }
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"

                                >
                                    Color
                                </AccordionSummary>
                                <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
                                    {
                                        colorList.map((color, index) => {
                                            return (<FormControlLabel key={index} control={<Checkbox defaultChecked />} label={color} />)
                                        })
                                    }
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                        {/* main products display */}
                        <Box sx={{ flexGrow: 7 }}><ProductList /></Box>
                    </Box>
                    {/* bottom section */}
                    {rowDivider({ node: { margin: "20px 0px" } })}
                    <Stack justifyContent={'space-between'} direction={'row'}>
                        <Typography>Page: {page}</Typography>
                        <Pagination count={5} page={page} onChange={handlePageChange} />
                    </Stack>
                </Paper>
            </Box >
        </div >
    )
}
