import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const baseURL = "https://book-e-sell-node-api.vercel.app";

const CartItem = (props) => {
    const navigate = useNavigate();
    const handleDelete = async (id) => {
        await axios
            .delete(baseURL + `/api/cart?id=${id}`)
            .then((response) => {
                toast.success("Book Removed From Cart");
                props.fetchItem();
            })
            .catch((error) => {
                toast.error(`Some Problem while Removing From Cart: ${error}`);
                console.log(error);
            });
    };

    const handleMinus = async (item) => {
        if (item.quantity === 1) {
            toast.error("item quantity should not be zero");
            return;
        }
        const book = {
            id: item.id,
            bookId: item.bookId,
            userId: item.userId,
            quantity: item.quantity - 1,
        };
        try {
            const response = await axios.put(baseURL + "/api/cart", book);
            props.fetchItem();
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAdd = async (item) => {
        const book = {
            id: item.id,
            bookId: item.bookId,
            userId: item.userId,
            quantity: item.quantity + 1,
        };
        try {
            const response = await axios.put(baseURL + "/api/cart", book);
            props.fetchItem();
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="cartItemContainer">
            <div className="cartItemOuter">
                <div>
                    <img
                        src={props.item.book.base64image}
                        alt=""
                        className="cartItemimg"
                    />
                </div>
                <div className="cartItemInner">
                    <div className="cartItemInnerdiv1">
                        <p style={{ fontWeight: "600" }}>
                            {props.item.book.name}
                        </p>
                        <p style={{ fontWeight: "600" }}>
                            MRP ₹ {props.item.book.price}
                        </p>
                    </div>
                    <div className="cartItemInnerdiv2">
                        <div className="counter">
                            <button onClick={() => handleAdd(props.item)}>
                                +
                            </button>
                            <p>{props.item.quantity}</p>
                            <button onClick={() => handleMinus(props.item)}>
                                -
                            </button>
                        </div>
                        <Button
                            color="error"
                            onClick={() => handleDelete(props.item.id)}
                            variant="text"
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
