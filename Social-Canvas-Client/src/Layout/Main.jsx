import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Pages/Shared/NavBar/NavBar';
import Footer from '../Pages/Shared/Footer/Footer';


const Main = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <NavBar />
            <div className='flex-grow'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};


export default Main;