import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [likeStatus, setLikeStatus] = useState({});
    const token = localStorage.getItem('access-token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/posts/list/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setPosts(data);

                // Fetch like status for each post
                const likeStatusData = {};
                for (const post of data) {
                    const likedResponse = await axios.get(`http://127.0.0.1:8000/posts/like/check/${post.id}/`, {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    });
                    // console.log('response: ', likedResponse.data)
                    // likeStatusData[post.id] = likedResponse.data;
                }
                // console.log('likeStatusData: ', likeStatusData)
                setLikeStatus(likeStatusData);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [token]);

    const handleLike = async (postId) => {
        try {
            // const isLiked = likeStatus[postId];
            const isLiked = likeStatus[postId] && likeStatus[postId].user_has_liked;

            if (isLiked) {
                // Unlike the post
                await axios.post(`http://127.0.0.1:8000/posts/like/unlike/${postId}/`, null, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
            } else {
                // Like the post
                await axios.post(`http://127.0.0.1:8000/posts/like/create/${postId}/`, null, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
            }

            // Refetch posts and like status for the specific post
            fetchData();
        } catch (error) {
            console.error('Error handling like:', error.message);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="max-w-2xl w-full p-4">
                    <h1 className="text-2xl font-bold mb-4">All Posts</h1>
                    <ul className="space-y-4">
                        {posts.map(post => (
                            <li key={post.id} className="bg-white p-4 shadow-md rounded-md">
                                <p className="text-lg font-semibold mb-2">{post.user.first_name} {post.user.last_name}</p>
                                <p className="">{post.content}</p>
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
                                <p className="mr-2">Like Count: {post.like_count}</p>
                                {/* <button
                                    className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
                                    onClick={() => handleLike(post.id)}
                                >
                                    {likeStatus[post.id] ? 'Unlike' : 'Likes'}
                                </button> */}

                                <button
                                    className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
                                    onClick={() => handleLike(post.id)}
                                >
                                    {likeStatus[post.id] && likeStatus[post.id].user_has_liked ? 'Unlike' : 'Like'}
                                </button>

                                <p>Comment Count: {post.comment_count}</p>
                                <p> Like Status: {likeStatus[post.id] && likeStatus[post.id].user_has_liked ? 'Liked' : 'Not Liked'} </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AllPosts;
