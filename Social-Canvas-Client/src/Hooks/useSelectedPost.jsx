import { useQuery } from '@tanstack/react-query';

const useSelectedPost = (selectedPostId) => {
    const token = localStorage.getItem('access-token');

    const { refetch, data: newEditedData = [] } = useQuery({
        queryKey: ['getNewEditedData'],
        queryFn: async (_, selectedPostId) => {
            const res = await fetch(`http://127.0.0.1:8000/posts/my-posts/update/${selectedPostId}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return res.json();
        },
    });

    return [newEditedData, refetch];
};

export default useSelectedPost;