export const HOST = import.meta.env.VITE_SERVER_HOST;

export const AUTH_ROUTES = '/api/auth';
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;

export const PROFILE_ROUTE = `${AUTH_ROUTES}/profile`; // Profile update route
export const UPLOAD_ROUTE = `${AUTH_ROUTES}/updateProfile`;   // Image upload route
