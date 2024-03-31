import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <section className="bg-blue-500 py-12">
            <div className="container mx-auto px-4">
                <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-4">Connect with Your Community</h1>
                    <p className="text-lg mb-8">Join the conversation, share your moments!</p>
                    <Link to="/signUp">
                        <button className="bg-white text-blue-800 font-bold py-3 px-6 rounded-full hover:bg-white hover:text-blue-800 transition duration-300 ease-in-out">
                            Join Now
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Banner;
