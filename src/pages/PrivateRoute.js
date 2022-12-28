import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
    const { user } = useAuth0();

    // here use this componet have a bad issue, navigating to /checkout route as soon as posible than getting user detail from useAuth0(), so with this important reason why we wrote this component. but if I just get details of user when it login and store it in user_context I can access them with condition in App.js

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
};
export default PrivateRoute;
