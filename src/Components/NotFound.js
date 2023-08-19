import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Button } from "@mui/material";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="OuterErrorDiv">
            <header className="ErrorInner">
                <p>404</p>
                <div className="ErrorInner1">Page Not Found</div>
                <center>
                    The page you are looking for might have been removed had its
                    name changed or is temporarily unavailable
                </center>
                <br />
                <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    HomePage
                </Button>
            </header>
        </div>
    );
};

export default NotFound;
