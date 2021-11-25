import { AnyRecord } from "dns";
import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducers";

interface ContextInterface {
    user: any,
    isFetching: boolean,
    error: any,
    dispatch: any
}

const INITIAL_STATE = {
    user: null,
    isFetching: false,
    error: false,
    dispatch: null
};

export const AuthContext:any = createContext<ContextInterface>(INITIAL_STATE);

export const AuthContextProvider = ({children}: any) => {
    const [state, dispatch]: any = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider value={{
            user: state.user, isFetching: state.isFetching, error: state.error,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}