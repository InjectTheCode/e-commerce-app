import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import { Auth0Provider } from "@auth0/auth0-react";

import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Auth0Provider
        domain="dev-rccvqyw18e5dm8b6.us.auth0.com"
        clientId="A4rc2wDoGnoNmlonfnoE6YZPNNapeXX0"
        redirectUri={window.location.origin}
        cacheLocation="localstorage"
    >
        <UserProvider>
            <BrowserRouter>
                <ProductsProvider>
                    <FilterProvider>
                        <CartProvider>
                            <App />
                        </CartProvider>
                    </FilterProvider>
                </ProductsProvider>
            </BrowserRouter>
        </UserProvider>
    </Auth0Provider>
);
