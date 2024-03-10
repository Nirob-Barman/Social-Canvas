import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comments from './Comments/Comments';
import AddCommentComponent from './Comments/AddCommentComponent/AddCommentComponent';
import LikeButton from './LikeButton/LikeButton';
import useAllPost from '../../../Hooks/useAllPost';


const AllPosts = () => {
    // const [posts, setPosts] = useState([]);

    const [posts, refetch] = useAllPost();
    console.log(posts);

    // const token = localStorage.getItem('access-token');


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('http://127.0.0.1:8000/posts/list/', {
    //                 headers: {
    //                     Authorization: `Token ${token}`,
    //                 },
    //             });

    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch data');
    //             }

    //             const data = await response.json();
    //             setPosts(data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error.message);
    //         }
    //     };

    //     fetchData();
    // }, [token]);

    // const handleLike = async (postId) => {
    //     try {
    //         const response = await axios.post(`http://127.0.0.1:8000/posts/like/${postId}/`, {}, {
    //             headers: {
    //                 Authorization: `Token ${token}`,
    //             },
    //         });

    //         if (response.status === 200) {
    //             // Refresh the posts after a successful like
    //             fetchData();
    //         }
    //     } catch (error) {
    //         console.error('Error liking post:', error.message);
    //     }
    // };

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
                                <LikeButton postId={post.id} />
                                <p>Id: {post.id}</p>
                                <Comments postId={post.id} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AllPosts;
