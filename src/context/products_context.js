import React, { useContext, useEffect, useReducer, createContext } from "react";
import axios from "axios";

import reducer from "../reducers/products_reducer";
// this is also our products_reducer, but imported as just reducer.

import { products_url as url } from "../utils/constants";
import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE,
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const initialState = {
    isSidebarOpen: false,
};

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const openSidebar = () => {
        dispatch({ type: SIDEBAR_OPEN });
    };
    const closeSidebar = () => {
        dispatch({ type: SIDEBAR_CLOSE });
    };

    console.log(useReducer, "my State ===>", state);
    return (
        <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
            {children}
        </ProductsContext.Provider>
    );
};
// make sure use
export const useProductsContext = () => {
    return useContext(ProductsContext);
};
