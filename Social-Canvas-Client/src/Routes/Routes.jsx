import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
// import UpdateUserForm from "../Pages/UpdateUserForm/UpdateUserForm";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/signUp',
                element: <SignUp />
            },
            {
                path: 'login',
                element: <Login />
            },
            // {
            //     path: 'updateProfile',
            //     element: <UpdateUserForm />
            // },
        ]
    },
]);