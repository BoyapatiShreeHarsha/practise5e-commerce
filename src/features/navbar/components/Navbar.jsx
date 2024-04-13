import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Badge, Divider, Stack } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { customButton } from "../../../utils/muiCustomComponents";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectTotalCartItems } from "../../cart/cartSlice";
import { selectCurrUser } from "../../user/userSlice";

const pages = ["Products", "Pricing", "Blog"];
const settings = [
    { name: "Your Profile", link: "/user-profile" },
    { name: "Your Orders", link: "/user-orders" },
    { name: "Settings", link: "/" },
    { name: "Logout", link: "/logout" }
]

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [active, setActive] = React.useState("");
    const cartItemsCount = useSelector(selectTotalCartItems);

    const userInfo = useSelector(selectCurrUser);


    const handleActive = (value) => {
        setActive(prev => value)
    }

    const handleOpenNavMenu = () => {
        setAnchorElNav(prev => !prev);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate();

    return (
        <Box>
            <AppBar position="static" sx={{ bgcolor: "rgb(31, 41, 55)" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box onClick={() => navigate("/")} sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: { xs: "none", md: "flex" },
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                LOGO
                            </Typography>

                            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: { xs: "flex", md: "none" },
                                    flexGrow: 1,
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                LOGO
                            </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                            {pages.map((page, index) => (
                                <p key={index}>{customButton({
                                    label: page,

                                    propsToBePassed: {
                                        variant: "contained",
                                        onClick: () => {
                                            handleActive(page);
                                        },
                                        key: index,
                                        sx: { margin: "0 3px", color: "white", display: "block", justifyContent: "flex-start", bgcolor: active === page ? "rgb(17, 24, 39)" : "rgb(31, 41, 55)" }
                                    },
                                    classprops: { hover_background_color: active === page ? "rgb(17, 24, 39)" : "rgb(55, 65, 81)" }
                                })}</p>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" }, justifyContent: "flex-end", alignItems: "center" }}>
                            <Link to={'/cart'} style={{ color: "white" }}>
                                {cartItemsCount > 0 && <Badge badgeContent={cartItemsCount} color="primary" sx={{ marginRight: "20px" }}>
                                    <ShoppingCartIcon />
                                </Badge>}
                            </Link>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={userInfo?.uname} >{userInfo?.uname ? userInfo.uname[0] : '?'}</Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting, index) => (
                                    <MenuItem key={`setting${index}`} onClick={handleCloseUserMenu}>
                                        <Link to={setting.link} style={{ textDecoration: "none", color: "black" }}><Typography textAlign="center">{setting.name}</Typography></Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: "flex-end" }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                {!anchorElNav ? <MenuIcon /> : <CloseIcon />}
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {anchorElNav ? <Box sx={{ bgcolor: "rgb(31, 41, 55)", padding: "10px 0px", display: { xs: "block", md: "none" } }}>
                <Stack spacing={1}>
                    {
                        pages.map((page, index) => {

                            return <div style={{ width: "100%" }} key={index}>{customButton({
                                label: page,

                                propsToBePassed: {
                                    variant: "contained",
                                    onClick: () => {
                                        handleActive(page);
                                    },
                                    key: index,
                                    sx: { justifyContent: "flex-start", bgcolor: active === page ? "rgb(17, 24, 39)" : "rgb(31, 41, 55)", width: "100%" }
                                },
                                classprops: { hover_background_color: active === page ? "rgb(17, 24, 39)" : "rgb(55, 65, 81)" }
                            })}</div>
                        })
                    }
                </Stack>

                <Divider sx={{ bgcolor: "white", margin: "20px 0px" }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "white", margin: "0 24px 15px 8px" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton>
                            <Avatar alt={userInfo.uname}>{userInfo.uname ? userInfo.uname[0] : '?'}</Avatar>
                        </IconButton>
                        <Box>
                            <p>{userInfo?.uname}</p>
                            <p>{userInfo.email}</p>
                        </Box>
                    </Box>
                    <Link to={'/cart'} style={{ color: "white" }}>
                        {cartItemsCount > 0 && <Badge badgeContent={cartItemsCount} color="primary">
                            <ShoppingCartIcon />
                        </Badge>}
                    </Link>
                </Box>
                <Stack spacing={1}>
                    {
                        settings.map((setting, index) => {
                            return (<Link key={`setting-${index}`} to={setting.link} style={{ width: "100%" }}>{customButton({
                                label: setting.name,
                                propsToBePassed: {
                                    variant: "contained",
                                    key: index,
                                    sx: { justifyContent: "flex-start", bgcolor: "rgb(31, 41, 55)", width: "100%" }
                                },
                                classprops: { hover_background_color: "rgb(55, 65, 81)" }
                            })}</Link>)
                        })
                    }
                </Stack>
            </Box> : <></>}
        </Box>
    );
}
export default ResponsiveAppBar;
