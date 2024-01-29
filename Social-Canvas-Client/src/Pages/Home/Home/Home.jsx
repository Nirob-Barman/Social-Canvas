import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";

const Home = () => {
    const { user, sessionid, csrfToken } = useAuth();
    
    console.log("User: ", user)
    console.log("sessionid: ", sessionid)
    console.log("csrfToken: ", csrfToken)

    return (
        <div>
            <Helmet>
                <title>Phi Book | Home</title>
            </Helmet>
            Hello {user?.email} 
            <div>
                {sessionid} 
            </div>
            <div>
                {csrfToken}
            </div>
        </div>
    );
};

export default Home;