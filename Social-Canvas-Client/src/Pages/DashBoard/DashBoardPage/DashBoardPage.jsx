import React from 'react';
import useRecentPosts from '../../../Hooks/useRecentPosts';

const DashBoardPage = () => {
    const [recentPosts, refetch] = useRecentPosts();

    return (
        <div className='min-h-screen'>
            <div className="mt-5">
                <h2 className="text-xl font-semibold mb-5 text-center">Recent Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentPosts.map(post => (
                        <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
                            <img src={post.image} alt={post.content} className="w-full h-40 object-cover rounded-md mb-4" />
                            <h3 className="text-lg font-semibold mb-2">{post.content}</h3>
                            <p className="text-gray-600 text-sm">{`Posted by ${post.user.first_name} ${post.user.last_name}`}</p>
                            <p className="text-gray-600 text-sm">{`Likes: ${post.like_count}`}</p>
                            <p className="text-gray-600 text-sm">{`Comments: ${post.comment_count_value}`}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashBoardPage;
