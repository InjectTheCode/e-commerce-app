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
    filter_loading: false,
    grid_view: true,
    sort: "price-lowest",
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

    const updateSort = (e) => {
        //  we donot need this in this situation, just for demonstration.
        // const name = e.target.name;
        const value = e.target.value;
        console.log(value);
        dispatch({ type: UPDATE_SORT, payload: value });
    };

    useEffect(() => {
        dispatch({ type: SORT_PRODUCTS });
    }, [products, state.sort]);

    useEffect(() => {
        dispatch({ type: LOAD_PRODUCTS, payload: products });
    }, [products]);

    return (
        <FilterContext.Provider value={{ ...state, setGridView, setListView, updateSort }}>
            {children}
        </FilterContext.Provider>
    );
};

// make sure use
export const useFilterContext = () => {
    return useContext(FilterContext);
};
