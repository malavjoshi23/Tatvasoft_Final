import React, { useContext, useState } from "react";
import "../App.css";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../index.js";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated, user, setUser } =
        useContext(Context);
    if (isAuthenticated === false) {
        console.log(isAuthenticated);
        return <Navigate to={"/login"} />;
    }
    const handleMsg = (e) => {
        console.log(e.target.value);
        setMsg(e.target.value);
    };
    const handleName = (e) => {
        console.log(e.target.value);
        setName(e.target.value);
    };
    const handleEmail = (e) => {
        console.log(e.target.value);
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Succesfully Submitted Your Msg");
        console.log(`Name: ${name} Email: ${email} Msg: ${msg}`);
        navigate("/");
    };

    return (
        <div className="App">
            <header className="App-header">
                <Typography variant="h5" gutterBottom>
                    Contact Us
                </Typography>
                <form action="/" onSubmit={handleSubmit}>
                    <TextField
                        required
                        fullWidth
                        id="outlined-basic"
                        label="name"
                        variant="outlined"
                        margin="dense"
                        onChange={handleName}
                    />
                    <TextField
                        type="email"
                        required
                        fullWidth
                        id="outlined-basic"
                        label="email"
                        variant="outlined"
                        margin="dense"
                        onChange={handleEmail}
                    />
                    <TextField
                        required
                        fullWidth
                        id="outlined-basic"
                        label="Message"
                        variant="outlined"
                        margin="dense"
                        onChange={handleMsg}
                        inputProps={{
                            style: {
                                height: "3em",
                            },
                        }}
                    />
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </form>
            </header>
        </div>
    );
};

export default Contact;
