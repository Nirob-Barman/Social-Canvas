import { useQuery } from '@tanstack/react-query';

const useTopLikedPosts = () => {
    // const token = localStorage.getItem('access-token');

    const { refetch, data: topLikedPosts = [] } = useQuery({
        queryKey: ['getTopLikedPosts'],
        queryFn: async () => {
            const res = await fetch(`http://127.0.0.1:8000/posts/liked-posts/top/`, {
                // headers: {
                //     Authorization: `Token ${token}`,
                // },
            });
            return res.json();
        },
    });

    return [topLikedPosts, refetch];
};

export default useTopLikedPosts;