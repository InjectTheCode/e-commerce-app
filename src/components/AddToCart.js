import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaCheck } from "react-icons/fa";

import { useCartContext } from "../context/cart_context";

import AmountButtons from "./AmountButtons";

const AddToCart = ({ product }) => {
    const { id, stock, colors } = product;
    const { addToCart } = useCartContext();

    const [maincolor, setMainColor] = useState(colors[0]);
    const [amount, setAmount] = useState(1);

    const increase = () => {
        setAmount((oldAmount) => {
            let tempAmount = oldAmount + 1;
            if (tempAmount > stock) {
                tempAmount = stock;
                toast.warn("Can't order more than items in stock", {
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
            return tempAmount;
        });
    };

    const decrease = () => {
        setAmount((oldAmount) => {
            let tempAmount = oldAmount - 1;
            if (tempAmount < 1) {
                tempAmount = 1;
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
            return tempAmount;
        });
    };

    return (
        <Wrapper>
            <div className="colors">
                <span>colors : </span>
                <div>
                    {colors.map((color, index) => {
                        return (
                            <button
                                key={index}
                                className={`${
                                    maincolor === color ? "color-btn active" : "color-btn"
                                }`}
                                style={{ background: color }}
                                onClick={() => setMainColor(color)}
                            >
                                {maincolor === color && <FaCheck />}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="btn-container">
                <AmountButtons amount={amount} increase={increase} decrease={decrease} />
                <Link
                    to="/cart"
                    className="btn"
                    onClick={() => addToCart(id, maincolor, amount, product)}
                >
                    add to cart
                </Link>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    margin-top: 2rem;
    .colors {
        display: grid;
        grid-template-columns: 125px 1fr;
        align-items: center;
        margin-bottom: 1rem;
        span {
            text-transform: capitalize;
            font-weight: 700;
        }
        div {
            display: flex;
        }
    }
    .color-btn {
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        background: #222;
        margin-right: 0.5rem;
        border: none;
        cursor: pointer;
        opacity: 0.5;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
            font-size: 0.75rem;
            color: var(--clr-white);
        }
    }
    .active {
        opacity: 1;
    }
    .btn-container {
        margin-top: 2rem;
    }

    .btn {
        margin-top: 1rem;
        width: 140px;
    }
    .warning {
        border-bottom: 1px solid var(--clr-primary-5);
    }
`;
export default AddToCart;
