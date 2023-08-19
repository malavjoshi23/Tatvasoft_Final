import "./App.css";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import {  useState } from "react";

import NotFound from "./Components/NotFound.js";
import Home from "./Components/Home";
import Register from "./Components/Register";
import AddBook from "./Components/AddBook.js";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Login from "./Components/Login";

import { BsFillCartCheckFill } from "react-icons/bs";
import EditBooks from "./Components/EditBooks";
import EditBook from "./Components/EditBook";
import Footer from "./Components/Footer";
import UpdateUser from "./Components/UpdateUser";
import SearchResult from "./Components/SearchResult";
import Cart from "./Components/Cart";

import { Provider } from "react-redux";
import store from "./Store/store.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateUser } from "./Store/userSlice.js";
import { updateAuthenticatedState } from "./Store/authenticatedSlice.js";

import Users from "./Components/Users.js";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    const authenticated = useSelector((state) => state.isAuthenticated);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        console.log("click");
        setIsOpen(!isOpen);
        console.log(isOpen);
    };

    const moveToCart = () => {
        navigate("/cart");
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <>
                <div>
                    <>
                        <Box sx={{ flexGrow: 1 }} className="box">
                            <div
                                className="redDiv"
                                style={{
                                    height: "10px",
                                    backgroundColor: "#F13A41",
                                }}
                            ></div>
                            <AppBar
                                position="static"
                                sx={{ backgroundColor: "#fff" }}
                            >
                                <Toolbar>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="menu"
                                        sx={{ mr: 2 }}
                                        onClick={handleClick}
                                    >
                                        <MenuIcon sx={{ color: "black" }} />
                                    </IconButton>
                                    <img src="" alt="" />
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        sx={{ flexGrow: 1, color: "black" }}
                                    >
                                        BooksStore
                                    </Typography>
                                    <Button
                                        sx={{
                                            color: "black",
                                            borderColor: "black",
                                            height: "40px",
                                        }}
                                        variant="outlined"
                                        onClick={moveToCart}
                                    >
                                        <BsFillCartCheckFill size={25} />
                                        &nbsp;
                                        <p style={{ color: "#F13A41" }}>
                                            {/* <b>0</b> */}
                                        </p>
                                        &nbsp;
                                        <p>Cart</p>
                                    </Button>
                                    <Button color="inherit">
                                        {authenticated === false ? (
                                            <Button
                                                sx={{
                                                    color: "black",
                                                    borderColor: "black",
                                                    height: "40px",
                                                }}
                                                variant="outlined"
                                                onClick={{}}
                                            >
                                                Login
                                            </Button>
                                        ) : (
                                            <Button
                                                sx={{
                                                    color: "black",
                                                    borderColor: "black",
                                                    height: "40px",
                                                }}
                                                variant="outlined"
                                                onClick={() => {
                                                    dispatch(
                                                        updateAuthenticatedState(
                                                            false
                                                        )
                                                    );
                                                    dispatch(updateUser({}));
                                                }}
                                            >
                                                Logout
                                            </Button>
                                        )}
                                    </Button>
                                </Toolbar>
                            </AppBar>
                        </Box>
                        {isOpen === false ? (
                            <></>
                        ) : (
                            <div className="navbar">
                                <div className="nav">
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        padding="normal"
                                        sx={{ flexGrow: 1 }}
                                    >
                                        <Link to={"/"}>Home</Link>
                                    </Typography>
                                </div>
                                <div className="nav">
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        padding="normal"
                                        sx={{ flexGrow: 1 }}
                                    >
                                        <Link to={"/add"}>Add a Book</Link>
                                    </Typography>
                                </div>
                                <div className="nav">
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        padding="normal"
                                        sx={{ flexGrow: 1 }}
                                    >
                                        <Link to={"/admin"}>Admin</Link>
                                    </Typography>
                                </div>
                                <div className="nav">
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        padding="normal"
                                        sx={{ flexGrow: 1 }}
                                    >
                                        <Link to={"/users"}>Users</Link>
                                    </Typography>
                                </div>
                                <div className="nav">
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        padding="normal"
                                        sx={{ flexGrow: 1 }}
                                    >
                                        <Link to={"/update"}>
                                            Update Profile
                                        </Link>
                                    </Typography>
                                </div>
                                <div className="nav">
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        padding="normal"
                                        sx={{ flexGrow: 1 }}
                                    >
                                        <Link to={"/login"}>Login</Link>
                                    </Typography>
                                </div>
                                <div className="nav">
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        padding="normal"
                                        sx={{ flexGrow: 1 }}
                                    >
                                        <Link to={"/register"}>Register</Link>
                                    </Typography>
                                </div>
                            </div>
                        )}

                        <SearchResult />

                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/add" element={<AddBook />} />
                            <Route path="/admin" element={<EditBooks />} />
                            <Route path="/editbook" element={<EditBook />} />
                            <Route path="/update" element={<UpdateUser />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/" element={<Home />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </>
                </div>
                <br /> <br />
                <Footer />
            </>
        </ThemeProvider>
    );
}

const AppWrapper = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};
export default AppWrapper;
