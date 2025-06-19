import { createAuth0Client } from '@auth0/auth0-spa-js';
import type { Auth0Client, Auth0ClientOptions } from '@auth0/auth0-spa-js';

let client: Auth0Client | null = null;

export async function getAuth0(): Promise<Auth0Client> {
    if (client) return client;

    const opts: Auth0ClientOptions = {
        domain: import.meta.env.VITE_AUTH0_DOMAIN,
        clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
        authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            redirect_uri: window.location.origin
        },
        useRefreshTokens: true,
        cacheLocation: 'localstorage'
    };

    client = await createAuth0Client(opts);
    return client;
}

export async function ensureLogged(): Promise<void> {
    const c = await getAuth0();
    if (!(await c.isAuthenticated())) {
        await c.loginWithPopup();
    }
}

export async function getToken(): Promise<string> {
    const c = await getAuth0();
    return c.getTokenSilently();
}
