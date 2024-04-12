import React, { createContext, useReducer, useEffect, ReactNode } from "react";


interface User {
    name: string;
    token: string;

    id: string;
    email: string;
}
type AuthAction = { type: string; payload: User };

interface AuthState {
    user: User | null;
}
const initialState: AuthState = {
    user: null,
};
// interface AuthContextProps {
//     user: any;
//     dispatch: React.Dispatch<{ type: string; payload: any }>;
// }

export const AuthContext = createContext<{
    user: User | null;
    dispatch: React.Dispatch<AuthAction>;
}>({
    user: null,
    dispatch: () => null,
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null };
        default:
            return state;
    }
};

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

  
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user: User = JSON.parse(storedUser);
            dispatch({ type: "LOGIN", payload: user });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user: state.user, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
