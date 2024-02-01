import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllPosts = () => {

    const [posts, setPosts] = useState([]);
    console.log(posts);

    const token = localStorage.getItem('access-token');


    const handleLike = async (postId) => {
        try {
            // Check if the user has already liked the post
            const existingLike = posts.find(post => post.id === postId && post.user_has_liked);

            if (existingLike) {
                // If the user has already liked the post, unlike it
                await axios.delete(`http://127.0.0.1:8000/posts/like/${postId}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
            } else {
                // If the user hasn't liked the post, like it
                const response = await axios.post(`http://127.0.0.1:8000/posts/like/${postId}/`, null, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                // Update the posts array with the new like data
                const updatedPosts = posts.map(post => (post.id === postId ? response.data : post));
                setPosts(updatedPosts);
            }
        } catch (error) {
            console.error('Error liking/unliking post:', error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch('http://127.0.0.1:8000/posts/list/', {
                const response = await fetch('http://127.0.0.1:8000/posts/all_posts/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once after the initial render
    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="max-w-2xl w-full p-4">
                    <h1 className="text-2xl font-bold mb-4">All Posts</h1>
                    <ul className="space-y-4">
                        {posts.map(post => (
                            <li key={post.id} className="bg-white p-4 shadow-md rounded-md">
                                <p className="text-lg font-semibold mb-2">{post.content}</p>
                                <p>Created At: {post.created_at}</p>
                                <p className="mr-2">Like Count: {post.like_count}</p>
                                <button onClick={() => handleLike(post.id)} className="bg-blue-500 text-white py-1 px-2 rounded mt-2">
                                    {post.user_has_liked ? 'Unlike' : 'Like'}
                                </button>
                                <p>Comment Count: {post.comment_count}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default AllPosts;