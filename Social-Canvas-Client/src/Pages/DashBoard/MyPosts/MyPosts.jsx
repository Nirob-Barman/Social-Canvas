import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../Hooks/useAuth';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    console.log(posts)
    const { token } = useAuth();
    console.log('token from MyPosts: ', token)

    // useEffect(() => {
    //     // Fetch the user's posts from the Django API
    //     axios.get('http://127.0.0.1:8000/posts/my-posts/')
    //         .then(response => setPosts(response.data))
    //         .catch(error => console.error('Error fetching posts:', error));
    // }, []);


    useEffect(() => {
        // Check if token exists before making the request
        if (token) {
            // Fetch the user's posts from the Django API with the Authorization header
            axios.get('http://127.0.0.1:8000/posts/my-posts/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => setPosts(response.data))
                .catch(error => console.error('Error fetching posts:', error));
        }
    }, [token]);


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">My Posts</h1>

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b">Content</th>
                        <th className="py-2 px-4 border-b">Created At</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td className="py-2 px-4 border-b">{post.content}</td>
                            <td className="py-2 px-4 border-b">{post.created_at}</td>
                            <td className="py-2 px-4 border-b">
                                {/* You can add more buttons or actions here */}
                                <button className="text-sm bg-blue-500 text-white py-1 px-2 rounded mr-2">Edit</button>
                                <button className="text-sm bg-red-500 text-white py-1 px-2 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyPosts;