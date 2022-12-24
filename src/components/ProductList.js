import styled from "styled-components";

import { useFilterContext } from "../context/filter_context";

import GridView from "./GridView";
import ListView from "./ListView";
import Loading from "./Loading";

const ProductList = () => {
    const { filtered_products: products, grid_view, filter_loading } = useFilterContext();

    if (filter_loading && products.length < 1) {
        return <Loading />;
    }

    if (products.length < 1) {
        return <H4>Sorry, no products matched your search...</H4>;
    }

    if (!grid_view) {
        return <ListView products={products} />;
    }

    return <GridView products={products}>product list</GridView>;
};

const H4 = styled.h4`
    margin-top: 5rem;
    text-transform: none;
`;

export default ProductList;
