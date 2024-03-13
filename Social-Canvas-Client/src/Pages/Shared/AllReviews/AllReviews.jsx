import React from 'react';

import { Rating, Heart } from "@smastrom/react-rating";
import axios from "axios";
import { useForm, Controller } from "react-hook-form"
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import useFetchReviews from '../../../Hooks/useFetchReviews';


const AllReviews = () => {
    const [reviews, isLoading, error, refetch] = useFetchReviews();

    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            message: "",
            rating: 5,
        },
    });

    const onSubmit = async (data) => {
        try {
            await axios.post("https://social-canvas.onrender.com/reviews/add/", data);
            // console.log("Review submitted successfully:", data);
        } catch (error) {
            console.error("Error submitting review:", error);
            if (error.response) {
                console.log("Server responded with:", error.response.data);
            } else {
                console.log("Error occurred:", error.message);
            }
        }
        refetch();
        reset();
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const myStyles = {
        itemShapes: Heart, // Assuming "Heart" is a valid component representing the shape of a rating item
        activeFillColor: '#ffb700', // Update the active fill color to red (#ff0000)
        inactiveFillColor: '#e5e5e5' // Update the inactive fill color to a light gray (#e5e5e5)
    };


    // Function to handle scrolling to the bottom of the page
    const handleScrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };


    return (
        <div>
            <section className="my-5">
                {isLoading ? (
                    // Show loading indicator
                    <div>Loading...</div>
                ) : error ? (
                    // Show error message
                    <div>Error: {error.message}</div>
                ) : (
                    // Show all reviews
                    <div>

                        <div>
                            <div className="mx-auto text-center md:w-4/12 my-8">
                                <p className="text-yellow-600 mb-2">--- Hear from Our Happy Users ---</p>
                                <h3 className="text-3xl uppercase border-y-4 py-4">All Reviews</h3>
                            </div>
                        </div>

                        {reviews.map((review) => (
                            <div key={review.id} className="my-4 p-4 border rounded-lg">
                                {/* Custom style for the rating component */}
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    itemStyles={myStyles}
                                    readOnly
                                    className="text-yellow-400 text-lg" // Use Tailwind CSS classes to style the rating
                                />
                                <p className="py-2">{review.message}</p>
                                <h3 className="text-lg text-orange-400">{review.name}</h3>



                            </div>
                        ))}


                        {

                            <form onSubmit={handleSubmit(onSubmit)} className="my-4 p-4 border rounded-lg">
                                <h2 className="text-xl font-semibold mb-2">Add a Review</h2>
                                <label className="block mb-2">
                                    <span className="text-gray-700">Name:</span>
                                    <Controller
                                        name="name"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: "Name is required" }}
                                        render={({ field, fieldState }) => (
                                            <input
                                                {...field}
                                                type="text"
                                                className={`border p-2 rounded mt-1 w-full ${fieldState.invalid ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />
                                        )}
                                    />
                                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                                </label>
                                <label className="block mb-2">
                                    <span className="text-gray-700">Message:</span>
                                    <Controller
                                        name="message"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: "Message are required" }}
                                        render={({ field, fieldState }) => (
                                            <textarea
                                                {...field}
                                                rows={4}
                                                className={`border p-2 rounded mt-1 w-full ${fieldState.invalid ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />
                                        )}
                                    />
                                    {errors.message && <span className="text-red-500">{errors.message.message}</span>}
                                </label>
                                <label className="block mb-2">
                                    <span className="text-gray-700">Rating:</span>
                                    <Controller
                                        name="rating"
                                        control={control}
                                        defaultValue={5}
                                        rules={{ required: "Rating is required" }}
                                        render={({ field, fieldState }) => (
                                            <select
                                                {...field}
                                                className={`border p-2 rounded mt-1 w-full ${fieldState.invalid ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            >
                                                <option value="5">5 Stars</option>
                                                <option value="4">4 Stars</option>
                                                <option value="3">3 Stars</option>
                                                <option value="2">2 Stars</option>
                                                <option value="1">1 Star</option>
                                            </select>
                                        )}
                                    />
                                    {errors.rating && <span className="text-red-500">{errors.rating.message}</span>}
                                </label>
                                <button type="submit" className="bg-blue-500  font-bold py-2 px-4 rounded">
                                    Submit Review
                                </button>
                            </form>
                        }



                    </div>
                )}






                {/* Add the upward arrow icon */}
                <button
                    className="fixed bottom-10 right-5 bg-blue-500 p-2 rounded-full text-white shadow-lg"
                    onClick={handleScrollToTop}
                >
                    <FaArrowUp size={20} />
                </button>


                {/* Add the downward arrow icon */}
                <button
                    className="fixed bottom-20 right-5 bg-blue-500 p-2 rounded-full text-white shadow-lg"
                    onClick={handleScrollToBottom}
                >
                    <FaArrowDown size={20} />
                </button>
            </section>
        </div>
    );
};

export default AllReviews;