import { Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { Navigate, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { updateUser } from "../Store/userSlice.js";
import { updateAuthenticatedState } from "../Store/authenticatedSlice.js";
import { useSelector } from "react-redux";

const baseURL = "https://book-e-sell-node-api.vercel.app";

const Login = () => {
    const authenticated = useSelector((state) => state.isAuthenticated);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);

        axios
            .post(baseURL + "/api/user/login", {
                email: email,
                password: password,
            })
            .then((response) => {
                toast.success("Login Successfully");
                setError("");
                console.log(response.data.result);
                dispatch(updateUser(response.data.result));
                dispatch(updateAuthenticatedState(true));
            })
            .catch((e) => {
                console.log(e);
                setError(e);
                dispatch(updateUser({}));
                dispatch(updateAuthenticatedState(false));
                toast.error("Something Went wrong! Please Check it once");
            });
    };
    if (authenticated === true) {
        return <Navigate to={"/"} />;
    }
    return (
        <div className="loginContainer">
            <Flex align="center" justify="center" direction="column">
                <Text fontSize="2.5em">Login or Create Account</Text>
                <div className="loginForm">
                    <div className="login">
                        <div>
                            <p>New Customer</p>
                            <span>Registration is Free and Easy</span>
                            <ul>
                                <li>Faster Checkout</li>
                                <li>Save multiple Shopping addresses</li>
                                <li>View and Track orders and more</li>
                            </ul>
                            <button
                                className="loginButton"
                                style={{ marginTop: "90px" }}
                                onClick={() => {
                                    navigate("/register");
                                }}
                            >
                                Create an Account
                            </button>
                        </div>
                        <div>
                            <p>Registered Customers</p>
                            <form action="/" onSubmit={handleSubmit}>
                                <div className="loginInput">
                                    <p>Enter Email:</p>
                                    <input
                                        required
                                        type="email"
                                        placeholder="Email"
                                        onChange={handleEmail}
                                    />
                                </div>
                                <div className="loginInput">
                                    <p>Password:</p>
                                    <input
                                        required
                                        type="password"
                                        placeholder="Conform Password"
                                        onChange={handlePassword}
                                    />
                                </div>
                                <button className="loginButton" type="submit">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Flex>
        </div>
    );
};

export default Login;
