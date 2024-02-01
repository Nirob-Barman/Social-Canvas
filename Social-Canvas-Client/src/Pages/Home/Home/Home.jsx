import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";

const Home = () => {
    const { user} = useAuth();
    

    return (
        <div>
            <Helmet>
                <title>Phi Book | Home</title>
            </Helmet>
            Hello {user?.email} 
            
        </div>
    );
};

export default Home;