import { useContext } from "react";
import AuthContext from "../context/AuthContext";


// Custom hook to access the auth context
const useAuthContext = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }

    return authContext;
};

export default useAuthContext;