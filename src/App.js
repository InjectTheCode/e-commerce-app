import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navbar, Sidebar, Footer } from "./components";

import { Home, Products, SingleProduct, About, Cart, Error, Checkout, PrivateRoute } from "./pages";

function App() {
    return (
        <>
            <Navbar />
            <Sidebar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<SingleProduct />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
