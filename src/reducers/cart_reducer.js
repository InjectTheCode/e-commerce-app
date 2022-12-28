import {
    ADD_TO_CART,
    CLEAR_CART,
    COUNT_CART_TOTALS,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cart_reducer = (state, action) => {
    if (action.type === ADD_TO_CART) {
        const { id, color, amount, product } = action.payload;
        const tempItem = state.cart.find((i) => i.id === id + color);
        if (tempItem) {
            const tempCart = state.cart.map((cartItem) => {
                if (cartItem.id === id + color) {
                    let newAmount = cartItem.amount + amount;
                    if (newAmount > cartItem.max) newAmount = cartItem.max;
                    return { ...cartItem, amount: newAmount };
                } else {
                    return cartItem;
                }
            });
            return { ...state, cart: tempCart };
        } else {
            const newItem = {
                id: id + color,
                name: product.name,
                color,
                amount,
                image: product.images[0].url,
                price: product.price,
                max: product.stock,
            };
            return { ...state, cart: [...state.cart, newItem] };
        }
    }

    if (action.type === REMOVE_CART_ITEM) {
        const filteredCart = state.cart.filter((item) => item.id !== action.payload);
        return { ...state, cart: filteredCart };
    }

    if (action.type === CLEAR_CART) {
        return { ...state, cart: [] };
    }

    if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
        const { id, value } = action.payload;
        if (value === "inc") {
            const tempCart = state.cart.map((item) => {
                if (item.id === id) {
                    let newAmount = item.amount + 1;
                    if (newAmount > item.max) {
                        newAmount = item.max;
                        toast.warn(`Can't order more than ${item.max}`, {
                            position: "bottom-right",
                            autoClose: 4000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                    return { ...item, amount: newAmount };
                }
                return item;
            });
            return { ...state, cart: tempCart };
        }
        if (value === "dec") {
            const tempCart = state.cart.map((item) => {
                if (item.id === id) {
                    let newAmount = item.amount - 1;
                    if (newAmount < 1) {
                        newAmount = 1;
                        toast.warn("Can't order less than 1 item", {
                            position: "bottom-right",
                            autoClose: 4000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                    return { ...item, amount: newAmount };
                }
                return item;
            });
            return { ...state, cart: tempCart };
        }
        return { ...state };
    }

    if (action.type === COUNT_CART_TOTALS) {
        const { total_items, total_amount } = state.cart.reduce(
            (total, cartItem) => {
                const { amount, price } = cartItem;
                total.total_items += amount;
                total.total_amount += amount * price;
                return total;
            },
            { total_items: 0, total_amount: 0 }
        );
        return { ...state, total_items, total_amount };
    }
    throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
