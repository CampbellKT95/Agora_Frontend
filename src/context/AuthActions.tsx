export const LoginStart = (user: any) => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (user: any) => ({
    type: "LOGIN_SUCCESS",
    payload: user
});

export const LoginFailure = (error: any) => ({
    type: "LOGIN_FAILURE",
    payload: error
});