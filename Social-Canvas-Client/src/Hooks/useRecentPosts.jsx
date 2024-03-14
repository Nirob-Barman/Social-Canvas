import { useQuery } from '@tanstack/react-query';

const useRecentPosts = () => {
    const token = localStorage.getItem('access-token');

    const { refetch, data: recentPosts = [] } = useQuery({
        queryKey: ['getRecentPosts'],
        queryFn: async () => {
            const res = await fetch(`https://social-canvas.onrender.com/posts/recent-posts/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return res.json();
        },
    });

    return [recentPosts, refetch];
};

export default useRecentPosts;