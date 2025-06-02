import axios from 'axios';
import { auth0 } from './auth';

async function getToken(): Promise<string> {
    const authenticated = await auth0.isAuthenticated();
    if (authenticated) return auth0.getTokenSilently();
    await auth0.loginWithRedirect({ appState: { returnTo: window.location.pathname } });
    return '';
}

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

api.interceptors.request.use(async (cfg) => {
    cfg.headers = cfg.headers || {};
    cfg.headers.Authorization = `Bearer ${await getToken()}`;
    return cfg;
});
