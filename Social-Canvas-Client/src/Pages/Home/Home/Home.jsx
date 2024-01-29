import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";

const Home = () => {
    const { user, token } = useAuth();
    
    console.log("User: ", user)
    console.log("Token: ", token)

    return (
        <div>
            <Helmet>
                <title>Phi Book | Home</title>
            </Helmet>
            Hello {user?.email} with {token}
        </div>
    );
};

export default Home;