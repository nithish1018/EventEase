import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (name: string,  email: string, password: string) => {
        setIsLoading(true);
        setError(false);

        console.log(name, email, password, + " hjvhj")
        const response = await fetch('http://localhost:4000/api/users/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, email: email, password: password })
        })

        const jsonRes = await response.json()
        console.log("sdasdas", jsonRes.error);

        if (jsonRes.error) {
            setSuccess(false);
            setIsLoading(false);
            setError(jsonRes.error);
        } else {
            localStorage.setItem("user", JSON.stringify(jsonRes))
            dispatch({ type: "LOGIN", payload: jsonRes })
            setSuccess(true)
            setError(false)
            setIsLoading(false);
        }
    }
    return {signup, isLoading, error, success};
}