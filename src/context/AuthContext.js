import React, {createContext, useEffect, useState} from "react";
import usePostRequest from "../hooks/usePostRequest";


const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {handlePost} = usePostRequest("/auths/logout")

    useEffect(() => {
        const authToken1 = sessionStorage.getItem('authToken');
        const authToken2 = localStorage.getItem('authToken');
        const session = sessionStorage.getItem('session');

        // Remember to change from saving userid in sessionStorage
        const userId = sessionStorage.getItem('userId');


    }, [setIsAuthenticated]);

    const logout = async () => {
        try {
            await handlePost();
            setIsAuthenticated(false);
            sessionStorage.clear();
            localStorage.clear();
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <AuthContext.Provider value={{ setIsAuthenticated, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};

export default AuthContext;
