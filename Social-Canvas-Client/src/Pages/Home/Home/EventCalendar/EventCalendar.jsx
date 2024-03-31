import React from 'react';

function EventCalendar() {
    // Updated event data for a social media platform
    const events = [
        {
            id: 1,
            title: 'Social Media Marketing Workshop',
            date: '2024-04-10',
            time: '2:00 PM - 4:00 PM',
            location: 'Online Event',
        },
        {
            id: 2,
            title: 'Photography Contest Deadline',
            date: '2024-04-15',
            time: 'All Day',
            location: 'Online',
        },
        {
            id: 3,
            title: 'Live Music Performance',
            date: '2024-04-20',
            time: '7:00 PM - 9:00 PM',
            location: 'Local Venue',
        },
        {
            id: 4,
            title: 'Cooking Class: Italian Cuisine',
            date: '2024-04-25',
            time: '6:00 PM - 8:00 PM',
            location: 'Community Center',
        },
        {
            id: 5,
            title: 'Fitness Challenge Kickoff',
            date: '2024-05-01',
            time: 'All Day',
            location: 'Online',
        },
    ];

    return (
        <div className="my-10">

            <div className="mx-auto text-center md:w-4/12 my-10">
                <h2 className="text-3xl text-center uppercase border-y-4 font-bold py-4">Event Calendar</h2>
            </div>

            <div className="max-w-4xl mx-auto px-4">
                {/* <h2 className="text-3xl text-center font-bold mb-8">Event Calendar</h2> */}

                {/* <div className="mx-auto text-center md:w-4/12 my-8">
                </div> */}
                {/* <h3 className="text-3xl uppercase border-y-4 py-4">Top Liked Posts</h3> */}

                <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                        >
                            <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                            <p className="text-gray-500 mb-2">
                                Date: {new Date(event.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                            <p className="text-gray-500 mb-2">Time: {event.time}</p>
                            <p className="text-gray-500">Location: {event.location}</p>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 transition duration-300 ease-in-out transform hover:scale-105">
                                Attend
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EventCalendar;
