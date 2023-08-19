import { Button } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "../App.css";
import axios from "axios";
import { toast } from "react-hot-toast";

const baseURL = "https://book-e-sell-node-api.vercel.app";

const SearchResult = () => {
    const [searchValue, setSearchValue] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [books, setBooks] = useState([]);
    const fetchBook = async () => {
        try {
            const response = await axios.get(
                baseURL + `/api/book/search?keyword=${searchValue}`
            );
            setBooks(response.data.result);
            console.log(response);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
    const handleSearch = () => {
        if (searchValue.length === 0)
            return toast.error("Please Write Books Name in Search Field");
        fetchBook();
        setShowResults(!showResults);
    };

    return (
        <div>
            <div className="searchBoxHomeOuter">
                <div className="searchBoxHome">
                    <input
                        onChange={(e) => setSearchValue(e.target.value)}
                        type="text"
                        placeholder="What are you looking for.."
                    />
                    &nbsp;&nbsp;&nbsp;
                    <Button
                        className="searchBoxButton"
                        sx={{
                            color: "white",
                            backgroundColor: "#80bf32",
                            "&:hover": {
                                backgroundColor: "#6ca52c",
                            },
                        }}
                        variant="contained"
                        size="large"
                        onClick={handleSearch}
                    >
                        <AiOutlineSearch style={{ color: "white" }} size={20} />
                        &nbsp;Search
                    </Button>
                </div>
            </div>
            {showResults && (
                <div className="searchResults">
                    {books.map((book) => {
                        return (
                            <div className="searchResultsOuter">
                                <div className="searchResultInner1">
                                    <p>
                                        <b>{book.name}</b>
                                    </p>
                                    <p>{book.price}₹</p>
                                </div>
                                <div className="searchResultInner2">
                                    <p>
                                        {book.description.substring(0, 15) +
                                            "..."}
                                    </p>
                                    <Button variant="text" color="error">
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SearchResult;
