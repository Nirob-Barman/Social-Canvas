import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import axios from 'axios';

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState('');
    

    console.log("token from AuthProvider when user changes: ", token);

    const googleProvider = new GoogleAuthProvider();


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // const logOut = () => {
    //     setLoading(true);
    //     return signOut(auth);
    // }

    // Inside the AuthProvider component
    const logOut = () => {
        setLoading(true);
        console.log('Logging out...');
        return axios.get('http://127.0.0.1:8000/accounts/logout/')
            .then(() => {
                // After successful logout from the backend, also sign out from Firebase
                console.log('Logged out successfully');

                // Delete the token from local storage
                localStorage.removeItem('access-token');
                
                return signOut(auth);
            })
            .catch(error => {
                console.error('Error logging out:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }


    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, currentUser => {
    //         setUser(currentUser);
    //         console.log('current user', currentUser);

    //         // get and set token
    //         // if (currentUser) {
    //         //     axios.post('https://grow-green-server.vercel.app/jwt', { email: currentUser.email })
    //         //         .then(data => {
    //         //             // console.log(data);
    //         //             // console.log(data.data);
    //         //             // console.log(data.data.token);
    //         //             localStorage.setItem('access-token', data.data.token)
    //         //             setLoading(false);
    //         //         })
    //         // }
    //         // else {
    //         //     localStorage.removeItem('access-token')
    //         // }
    //         // setLoading(false);
    //     });

    //     return () => {
    //         return unsubscribe();
    //     }
    // }, [])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, loggedUser => {
            // console.log('logged in user inside auth state observer', loggedUser)
            // console.log("Token from auth provider after login: ", token);
            if (loggedUser === null) {
                console.log('No User');
            } else {
                console.log('Logged in user');
            }
            setUser(loggedUser);

            // Check local storage for the token
            const storedToken = localStorage.getItem('access-token');
            if (storedToken) {
                // console.log('Token from local storage:', storedToken);
                setToken(storedToken);
            }

            setLoading(false);
        })

        return () => {
            unsubscribe();
        }
    }, [])

    
    const updateUser = (data) => {
        setLoading(true);
        return axios.put('http://127.0.0.1:8000/accounts/update/', data)
            .then(response => {
                console.log('User updated successfully:', response.data);
            })
            .catch(error => {
                console.error('Error updating user:', error);
                throw error;
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile,
        updateUser,
        token,
        setToken,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;