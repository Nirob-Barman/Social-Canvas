import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import MyPosts from "../Pages/DashBoard/MyPosts/MyPosts";
import UserDetail from "../Pages/DashBoard/UserDetail/UserDetail";
import UpdateUserForm from "../Pages/UpdateUserForm/UpdateUserForm";
import AllPosts from "../Pages/DashBoard/AllPosts/AllPosts";
import DashBoardPage from "../Pages/DashBoard/DashBoardPage/DashBoardPage";
import AddPost from "../Pages/DashBoard/AddPost/AddPost";
import UserLikedPosts from "../Pages/DashBoard/UserLikedPosts/UserLikedPosts";
import TopLikedPosts from "../Pages/DashBoard/TopLikedPosts/TopLikedPosts";
import TopCommentedPosts from "../Pages/DashBoard/TopCommentedPosts/TopCommentedPosts";
import AllReviews from "../Pages/Shared/AllReviews/AllReviews";

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
            {
                path: 'details',
                element: <UserDetail />
            },
            {
                path: 'updateProfile',
                element: <UpdateUserForm />
            },
            {
                path: 'all-reviews',
                element: <AllReviews />
            }
        ]
    },
    {
        path: '/posts',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: '/posts',
                element: <DashBoardPage />
            },
            {
                path: 'add',
                element: <AddPost />
            },
            {
                path: 'myPosts',
                element: <MyPosts />
            },
            {
                path: 'allPosts',
                element: <AllPosts />
            },
            {
                path: 'myLikedPosts',
                element: <UserLikedPosts />
            },
            // {
            //     path: 'topLikedPosts',
            //     element: <TopLikedPosts />
            // },
            // {
            //     path: 'topCommentedPosts',
            //     element: <TopCommentedPosts />
            // },
        ]
    }
]);