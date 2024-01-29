import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const Dashboard = () => {
    const { user, logOut, sessionid, csrfToken } = useAuth();
    console.log('sessionid from Dashboard: ', sessionid);
    console.log('csrfToken from Dashboard: ', csrfToken);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                // Redirect the user to the login page or any other appropriate page after logout
            })
            .catch(error => console.log(error));
    }

    const navOptions = (
        <ul className="flex items-center">
            <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
            <li><Link to="/posts/myPosts" className="text-white hover:text-gray-300">My Posts</Link></li>
            {user ? (
                <li onClick={handleLogOut}><Link className="text-white hover:text-gray-300">LogOut</Link></li>
            ) : (
                <li><Link to="/login" className="text-white hover:text-gray-300">Login</Link></li>
            )}
        </ul>
    );

    return (
        <div>
            <Helmet>
                <title>Phi Book | DashBoard</title>
            </Helmet>

            <div className="navbar bg-opacity-30 bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </label>

                        <ul tabIndex={0} className="text-black menu menu-compact dropdown-content mt-3 p-2 bg-gray-800 rounded-box ">
                            {navOptions}
                        </ul>
                    </div>

                    <Link to='/' className="btn btn-ghost normal-case text-xl text-white">Social Canvas</Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user && <Link to='' className="text-white hover:text-gray-300">Dashboard</Link>}
                </div>
            </div>

            <h1>DashBoard</h1>
            <div>
                {sessionid}
            </div>
            <div>
                {csrfToken}
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;