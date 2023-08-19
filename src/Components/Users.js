import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    styled,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import EditBook from "./EditBook";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const StyledTableCell = styled(TableCell)`
    color: black;
`;

const baseURL = "https://book-e-sell-node-api.vercel.app";

const Users = () => {
    const currentUser = useSelector((state) => state.user);
    const authenticated = useSelector((state) => state.isAuthenticated);

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const handleDelete = async (id) => {
        await axios
            .delete(baseURL + `/api/user?id=${id}`)
            .then((response) => {
                toast.success("User Deleted Successfully");
                fetchUsers();
            })
            .catch((error) => {
                toast.error(`Some Problem while deleting User: ${error}`);
                console.log(error);
            });
    };

    const fetchUsers = async () => {
        setLoading(true);
        await axios
            .get(baseURL + "/api/user/all")
            .then((response) => {
                setUsers(response.data.result);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    if (authenticated === false) {
        navigate("/login");
    }
    if (currentUser.role !== "admin") {
        return (
            <h3>
                <center> Only Admin can access this page!</center>
            </h3>
        );
    }
    return (
        <div>
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
                    User's Page
                </center>
            </h3>
            <div
                className="editBookTable"
                style={{
                    paddingLeft: "100px",
                    paddingRight: "100px",
                    paddingBottom: "100px",
                }}
            >
                <TableContainer>
                    <Table sx={{}} aria-label="simple table">
                        <TableHead>
                            <TableRow
                                sx={{
                                    backgroundColor: "white",
                                }}
                            >
                                <StyledTableCell>
                                    <span
                                        style={{
                                            fontWeight: "bolder",
                                            fontSize: "20px",
                                        }}
                                    >
                                        Email
                                    </span>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <span
                                        style={{
                                            fontWeight: "bolder",
                                            fontSize: "20px",
                                        }}
                                    >
                                        First Name
                                    </span>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <span
                                        style={{
                                            fontWeight: "bolder",
                                            fontSize: "20px",
                                        }}
                                    >
                                        Last Name
                                    </span>
                                </StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: "white" }}>
                            {users.map((user) => (
                                <TableRow
                                    key={user.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                        color: "black",
                                    }}
                                >
                                    <StyledTableCell
                                        sx={{ fontSize: "17px" }}
                                        component="th"
                                        scope="row"
                                    >
                                        {user.email}
                                    </StyledTableCell>
                                    <StyledTableCell sx={{ fontSize: "17px" }}>
                                        {user.firstName}
                                    </StyledTableCell>
                                    <StyledTableCell sx={{ fontSize: "17px" }}>
                                        {user.lastName}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default Users;
