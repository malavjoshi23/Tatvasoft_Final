import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast";
import { IconContext } from "react-icons";
import { BrowserRouter } from "react-router-dom";

export const Context = createContext();

const AppWrapper = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [cartItems, setCartItems] = useState([]);

    return (
        <Context.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                user,
                setUser,
                cartItems,
                setCartItems,
            }}
        >
            <App />
        </Context.Provider>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <IconContext.Provider value={{ color: "#F13A41" }}>
                <Toaster />
                <AppWrapper />
            </IconContext.Provider>
        </BrowserRouter>
    </React.StrictMode>
);
