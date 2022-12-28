import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navbar, Sidebar, Footer } from "./components";
import { useUserContext } from "./context/user_context";

import { Home, Products, SingleProduct, About, Cart, Error, Checkout, AuthWrapper } from "./pages";

function App() {
    const { myUser } = useUserContext();

    return (
        <AuthWrapper>
            <Navbar />
            <Sidebar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="cart" element={<Cart />} />
                <Route path="products" element={<Products />} />
                <Route path="products/:id" element={<SingleProduct />} />
                {/* <Route 
                    path="checkout"
                    element={
                        <PrivateRoute>
                            <Checkout />
                        </PrivateRoute>
                    } // ========> I don't know why some people do this way!
                    // ========> with simple code below you would access to checkout page or not!
                /> */}
                {myUser && <Route path="checkout" element={<Checkout />} />}
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </AuthWrapper>
    );
}

export default App;
