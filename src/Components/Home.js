import React, { useEffect, useState } from "react";
import axios from "axios";
import Posts from "./Posts";
import { Navigate } from "react-router-dom";
import "../App.css";

import { Grid, Paper } from "@mui/material";
import styled from "@emotion/styled";
import Loader from "./Loader";

import { useSelector } from "react-redux";

const baseURL = "https://book-e-sell-node-api.vercel.app";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "light" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const Home = () => {
    const currentUser = useSelector((state) => state.user);
    const authenticated = useSelector((state) => state.isAuthenticated);
    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");
    const [searchBook, setSearchBook] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await axios.get(baseURL + "/api/book/all");
            setBooks(response.data.result);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
        console.log(currentUser);
    };

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            await axios
                .get(baseURL + "/api/book/all")
                .then((response) => {
                    setBooks(response.data.result);
                    if (searchBook.length > 0) {
                        var filteredBooks = [];
                        if (searchBook.length > 0) {
                            filteredBooks = books.filter((book) =>
                                book.name.includes(searchBook)
                            );
                        }
                        setBooks(filteredBooks);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        };
        fetchPost();
    }, [searchBook]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleSearch = (e) => {
        setSearchBook(e.target.value);
        console.log(searchBook);
    };

    if (authenticated === false) {
        return <Navigate to={"/login"} />;
    }
    if (loading === true) {
        return <Loader />;
    }
    if (error) {
        return (
            <>
                <p>Something Went Wrong: {error}</p>
            </>
        );
    }

    return (
        <>
            <div>
                <header>
                    <br />
                    <center> Hello {currentUser.email} </center>
                    <h3 style={{ textAlign: "center" }}>
                        <center
                            style={{
                                display: "inline-block",
                                padding: "10px",
                                fontSize: "35px",
                                textAlign: "center",
                                borderBottom: "3px solid #FF101B",
                            }}
                        >
                            Book Listing
                        </center>
                    </h3>
                    <div className="search">
                        <h2>Total- {books.length} items</h2>
                        <input
                            type="text"
                            placeholder="Search.."
                            onChange={handleSearch}
                            value={searchBook}
                        />
                    </div>
                    <Grid
                        container
                        spacing={3}
                        paddingLeft={11}
                        paddingRight={11}
                        paddingBottom={5}
                    >
                        {books.map((book) => {
                            return (
                                <Grid item lg={3} md={6} sm={12} spacing={3}>
                                    <Item alignItems={"flex-start"}>
                                        <Posts
                                            id={book.id}
                                            name={book.name}
                                            category={book.category}
                                            price={book.price}
                                            img={book.base64image}
                                            description={book.description}
                                        />
                                    </Item>
                                </Grid>
                            );
                        })}
                    </Grid>
                </header>
            </div>
        </>
    );
};

export default Home;
