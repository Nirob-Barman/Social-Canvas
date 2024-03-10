import { useQuery } from '@tanstack/react-query';

const useMyPost = () => {
    const token = localStorage.getItem('access-token');

    const { refetch, data: posts = [] } = useQuery({
        queryKey: ['getMyPost'],
        queryFn: async () => {
            const res = await fetch(`http://127.0.0.1:8000/posts/my-posts/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return res.json();
        },
    });

    return [posts, refetch];
};

export default useMyPost;