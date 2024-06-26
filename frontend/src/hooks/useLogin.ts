import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false);
    const { dispatch } = useAuthContext()

    const login = async (email: any, password: any) => {
        setIsLoading(true)
        setError(null)
        setSuccess(false)

        const response = await fetch('http://localhost:4000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
            console.log("SignIn Failed: ", json.error)
            throw new Error("Sign In failed");

        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({ type: 'LOGIN', payload: json })
            setSuccess(true)
            setIsLoading(false)
        }
    }

    return [login, isLoading, error, success]
}