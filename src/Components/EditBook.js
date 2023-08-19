import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../index.js";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Button } from "@mui/material";

const baseURL = "https://book-e-sell-node-api.vercel.app";

const EditBook = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [bookName, setBookName] = useState(location.state.name);
    const [price, setPrice] = useState(location.state.price);
    const [file, setFile] = useState("");
    const [category, setCategory] = useState(location.state.categoryId);
    const [description, setDescription] = useState(location.state.description);

    const { isAuthenticated, setIsAuthenticated, user, setUser } =
        useContext(Context);

    const handleName = (e) => {
        setBookName(e.target.value);
    };

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleCancel = () => {
        navigate("/admin");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            toast.error("Please select an image.");
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = async () => {
            const base64Image = fileReader.result;

            try {
                const response = await axios.put(baseURL + "/api/book", {
                    id: location.state.id,
                    name: bookName,
                    description: description,
                    price: price,
                    categoryId: 9,
                    base64image: base64Image,
                });

                toast.success("Book Details Updated Successfully");
                console.log(response);
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    toast.error(
                        "Some Problem in Updating Book Details ! Please Try Again."
                    );
                } else {
                    toast.error(
                        "Some Problem in Updating Book Details ! Please Try Again."
                    );
                }
                console.error(error);
            }
        };

        fileReader.readAsDataURL(file);
        navigate("/admin");
    };

    return (
        <div>
            <span className="addBookHeading">
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
                        Edit Book
                    </center>
                </h3>
            </span>
            <div className="addForm">
                <form action="" onSubmit={handleSubmit}>
                    <div className="addBookFormDiv1">
                        <label htmlFor="name">Book Name: </label>
                        <input
                            className="addFormInput"
                            type="text"
                            id="name"
                            onChange={handleName}
                            value={bookName}
                        />
                        <br /> <br />
                        <label htmlFor="price">Book Price: </label>
                        <input
                            type="number"
                            className="addFormInput"
                            id="price"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                        />
                    </div>
                    <br />
                    <div className="addBookFormDiv2">
                        <label htmlFor="category">Category: </label>
                        <input
                            className="addFormInput"
                            type="text"
                            id="category"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        />
                        <br /> <br />
                        <input
                            className="addFormInputImage"
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="description">Description: </label>
                        <input
                            className="addFormInput"
                            type="text"
                            id="description"
                            value={description}
                        />
                    </div>
                    <br />
                    <Button
                        variant="contained"
                        size="large"
                        color="success"
                        type="submit"
                        sx={{ color: "white" }}
                    >
                        Save
                    </Button>{" "}
                    &nbsp;
                    <Button
                        variant="contained"
                        onClick={handleCancel}
                        size="large"
                        color="error"
                        sx={{ color: "white" }}
                    >
                        Cancel
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default EditBook;
