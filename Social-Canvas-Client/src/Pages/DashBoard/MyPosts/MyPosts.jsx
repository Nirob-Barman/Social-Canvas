import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditPostModal from './EditPostModal/EditPostModal';
import useMyPost from '../../../Hooks/useMyPost';

const MyPosts = () => {
    // const [posts, setPosts] = useState([]);

    const [posts, refetch] = useMyPost();

    const [selectedPost, setSelectedPost] = useState(null);

    // useEffect(() => {
    //     // Check if token exists before making the request
    //     const token = localStorage.getItem('access-token');
    //     if (token) {
    //         // Fetch the user's posts from the Django API with the Authorization header
    //         axios.get('http://127.0.0.1:8000/posts/my-posts/', {
    //             headers: {
    //                 Authorization: `Token ${token}`,
    //             },
    //         })
    //             .then(response => setPosts(response.data))
    //             .catch(error => console.error('Error fetching posts:', error));
    //     }
    // }, []);

    // const openEditModal = (postId) => {
    //     const token = localStorage.getItem('access-token');
    //     if (token) {
    //         axios.get(`http://127.0.0.1:8000/posts/my-posts/update/${postId}`, {
    //             headers: {
    //                 Authorization: `Token ${token}`,
    //             },
    //         })
    //             .then(response => {
    //                 setSelectedPost(response.data);
    //                 document.getElementById('my_modal_3').showModal();
    //             })
    //             .catch(error => console.error('Error fetching post data:', error));
    //     }
    // };

    // const closeEditModal = () => {
    //     setSelectedPost(null);
    //     document.getElementById('my_modal_3').close();
    // };

    const openEditModal = (postId) => {
        setSelectedPost({ id: postId });
        document.getElementById('my_modal_3').showModal();
    };

    const closeEditModal = () => {
        setSelectedPost(null);
        document.getElementById('my_modal_3').close();
    };

    const handleDeletePost = async (postId) => {
        const token = localStorage.getItem('access-token');
        if (token) {
            try {
                const response = await axios.delete(`http://127.0.0.1:8000/posts/my-posts/delete/${postId}`, {
                    headers: { Authorization: `Token ${token}` },
                });

                if (response.status === 204) {
                    // Post deleted successfully
                    // const updatedPosts = posts.filter((post) => post.id !== postId);
                    // setPosts(updatedPosts);
                    refetch();
                } else {
                    // Handle deletion error
                    console.error('Error deleting post:', response.data);
                    // Consider displaying an error message to the user
                }
            } catch (error) {
                console.error('Error deleting post:', error);
                // Consider displaying an error message to the user
            }
        }
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">My Posts</h1>

            {posts.map(post => (
                <div key={post.id} className="bg-white rounded-md shadow-md mb-4 p-4">
                    <p className="text-lg font-semibold mb-2">{post.content}</p>
                    {/* <p>Created At: {post.created_at}</p> */}
                    {/* <p>Updated At: {post.updated_at}</p> */}
                    <p>Like Count: {post.like_count}</p>
                    <p>Comment Count: {post.comment_count}</p>
                    {/* <p>{post.image}</p> */}
                    {post.image && (
                        <img src={post.image} alt="Post Image" className="mt-2 rounded-md" />
                    )}
                    {post.video_url && (
                        <iframe
                            title={`Video for Post ${post.id}`}
                            width="100%"
                            height="315"
                            src={post.video_url}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="mt-2 rounded-md"
                        ></iframe>
                    )}
                    <div className="flex mt-2">
                        <button
                            onClick={() => openEditModal(post.id)}
                            className="text-sm bg-blue-500 text-white py-1 px-2 rounded mr-2">Edit</button>
                        <button
                            onClick={() => handleDeletePost(post.id)}
                            className="text-sm bg-red-500 text-white py-1 px-2 rounded">Delete</button>
                    </div>
                </div>
            ))}

            <div>
                <EditPostModal selectedPost={selectedPost} closeModal={closeEditModal} />
            </div>

        </div>
    );
};

export default MyPosts;