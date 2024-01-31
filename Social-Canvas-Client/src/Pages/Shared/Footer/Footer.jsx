import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div>

            {/* Footer */}
            <footer className="mt-10 bg-gray-800 text-white">
                <div className="container mx-auto py-8">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full md:w-1/3 mb-8 md:mb-0">
                            <h3 className="text-lg font-semibold mb-4">About Us</h3>
                            <p className="text-gray-300">
                                Follow us on social media to stay updated on the latest quizzes and announcements:
                            </p>
                            <div className="flex justify-center mt-4 space-x-3">
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Facebook"
                                    className="text-gray-400 hover:text-white"
                                >
                                    <i className="fab fa-facebook"></i>
                                </a>
                                {/* ... (other social media links) */}
                            </div>
                        </div>

                        <div className="w-full md:w-1/3 mb-8 md:mb-0">
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="list-none">
                                <li>
                                    <a href="/home" className="text-gray-300 hover:text-white">Home</a>
                                </li>
                                {/* ... (other quick links) */}
                            </ul>
                        </div>

                        <div className="w-full md:w-1/3">
                            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                            <p className="text-gray-300">Email: phi@book.com</p>
                            <p className="text-gray-300">Phone: +123 456 7890</p>
                        </div>
                    </div>
                </div>

                <div className="text-center py-4 bg-gray-700">
                    {/* Use the dynamic year, author, and project information */}
                    <p className="text-gray-400">&copy; {currentYear} All rights reserved by Nirob Barman. Project: Phi Book</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;