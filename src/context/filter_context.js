import { useEffect, useContext, useReducer, createContext } from "react";

import reducer from "../reducers/filter_reducer";
import {
    LOAD_PRODUCTS,
    SET_GRIDVIEW,
    SET_LISTVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
    filtered_products: [],
    all_products: [],
    grid_view: true,
    sort: "price-lowest",
    filters: {
        text: "",
        company: "all",
        category: "all",
        color: "all",
        min_price: 0,
        max_price: 0,
        price: 0,
        shipping: false,
    },
};

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const { products } = useProductsContext();
    const [state, dispatch] = useReducer(reducer, initialState);

    const setGridView = () => {
        dispatch({ type: SET_GRIDVIEW });
    };

    const setListView = () => {
        dispatch({ type: SET_LISTVIEW });
    };

    // just get the value of sort option.
    const updateSort = (e) => {
        // =>  we donot need this in this situation, just for demonstration.
        // const name = e.target.name;
        const value = e.target.value;
        dispatch({ type: UPDATE_SORT, payload: value });
    };

    // a changeHandler for form of filter of products.
    const updateFilters = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === "category") {
            // => because the type of Categories is diffrent we need to change condition of "let value".
            value = e.target.textContent;
        }
        if (name === "color") {
            // => because the type of Colors is diffrent we need to change condition of "let value".
            value = e.target.dataset.color;
        }
        if (name === "price") {
            value = Number(value);
        }
        if (name === "shipping") {
            value = e.target.checked;
        }
        dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
    };

    // clear all of filters.
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTERS });
    };

    useEffect(() => {
        dispatch({ type: FILTER_PRODUCTS });
        dispatch({ type: SORT_PRODUCTS });
    }, [products, state.sort, state.filters]);

    useEffect(() => {
        // get the copy of main products array from product's context.
        dispatch({ type: LOAD_PRODUCTS, payload: products });
    }, [products]);

    return (
        <FilterContext.Provider
            value={{ ...state, setGridView, setListView, updateSort, updateFilters, clearFilter }}
        >
            {children}
        </FilterContext.Provider>
    );
};

// make sure use
export const useFilterContext = () => {
    return useContext(FilterContext);
};
