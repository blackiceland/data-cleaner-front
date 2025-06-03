import { getToken, ensureLogged } from './auth';

export async function runDeduplicate(rows: string[][]) {
    await ensureLogged();
    const jwt = await getToken();

    const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/sheets/duplicates`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify({ rows })
        }
    );

    if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error?.message ?? res.statusText);
    }

    const data = await res.json();

    return {
        exact: data.confirmed ?? [],
        maybe: data.candidates ?? []
    };
}