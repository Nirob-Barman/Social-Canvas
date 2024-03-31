import React from 'react';

function ContactAndSupport() {
    // Fake contact information
    const contactInfo = {
        address: '123 Main Street, City, Country',
        phone: '+1 123 456 7890',
        email: 'info@social_canvas.com',
    };

    return (
        <div className="bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">Contact and Support</h2>
                <div className="flex flex-col sm:flex-row items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-md mb-4 sm:mb-0 sm:w-1/3 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Address</h3>
                        <p>{contactInfo.address}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md mb-4 sm:mb-0 sm:w-1/3 sm:ml-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Phone</h3>
                        <p>{contactInfo.phone}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md sm:w-1/3 sm:ml-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Email</h3>
                        <p>{contactInfo.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactAndSupport;