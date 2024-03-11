import React, { createContext, useReducer, useEffect, ReactNode } from "react";

interface AuthContextProps {
    user: any;
    dispatch: React.Dispatch<{ type: string; payload: any }>;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    dispatch: () => { },
});

export const authReducer = (
    state: { user: any },
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
        default:
            return state;
    }
};

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") ?? "");
        if (user) {
            dispatch({ type: "LOGIN", payload: user });
        }
    }, []);

    return (
        <AuthContext.Provider value= {{ ...state, dispatch }
}>
    { children }
    </AuthContext.Provider>
  );
};
