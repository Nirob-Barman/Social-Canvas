import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import DashNavBar from '../Pages/DashBoard/DashNavBar/DashNavBar';

const Dashboard = () => {

    return (
        <div>
            <Helmet>
                <title>Phi Book | DashBoard</title>
            </Helmet>

            <DashNavBar />

            <div className="flex">
                {/* Left Side */}
                <div className="w-1/4 bg-gray-200 p-4">
                    {/* Add content for the left side */}
                    <div className='flex items-center justify-center'>
                    </div>
                </div>

                {/* Middle Side */}
                <div className="w-1/2 bg-gray-100 p-4">

                    <div>
                        <Outlet />
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-1/4 bg-gray-200 p-4">
                    {/* Add content for the right side */}
                    <div className='flex items-center justify-center'>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Dashboard;