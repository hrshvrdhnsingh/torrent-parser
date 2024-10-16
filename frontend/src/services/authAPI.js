import { apiConnector } from "./apiConnector"
import {authEndpoints} from './apis'

export const login = async (email, password, navigate) => {
    try {
        const response = await apiConnector("POST", authEndpoints.LOGIN_API, {email, password});
        console.log("Login response -> ", response)
        if(!response.data.success) throw new Error(response.data.message);
        
        localStorage.setItem("user", JSON.stringify(response.data.token));
        localStorage.setItem("email", JSON.stringify(email))
        navigate("/search");
    }
    catch(err) {
        console.log(err.message);
    }
}

export const signup = async(firstName, lastName, email, password, navigate) => {
    try {
        const response = await apiConnector("POST", authEndpoints.SIGNUP_API, {firstName, lastName, email, password});
        console.log("Signup response -> ", response) 
        if(!response.data.success) throw new Error(response.data.message);
        
        navigate("/login");
    }
    catch(err) {
        console.log(err.message);
    }
}

export const logout = (navigate) => {
    try {
        localStorage.removeItem("user")
        localStorage.removeItem("email")
        navigate("/login")
    }
    catch(err) {
        console.log("Eror in logging out", err.message)
    }
}