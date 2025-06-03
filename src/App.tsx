import { useState } from 'react';
import { fetchActiveRange } from './sheets';
import { runDeduplicate } from './api';

export default function App() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const [exact, setExact] = useState(0);
    const [maybe, setMaybe] = useState(0);
    const [err, setErr] = useState('');

    const handleClean = async () => {
        setStatus('loading');
        setErr('');
        try {
            const rows = await fetchActiveRange();
            const res = await runDeduplicate(rows);
            setExact(res.exact.length);
            setMaybe(res.maybe.length);
            setStatus('idle');
        } catch (e) {
            setStatus('error');
            setErr((e as Error).message);
        }
    };

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Data Cleaner</h2>
            <button disabled={status === 'loading'} onClick={handleClean}>
                {status === 'loading' ? 'Scanning…' : 'Clean duplicates'}
            </button>
            {exact + maybe > 0 && (
                <p>
                    Exact: <b>{exact}</b> &nbsp; Possible: <b>{maybe}</b>
                </p>
            )}
            {status === 'error' && <p style={{ color: '#e53935' }}>{err}</p>}
        </div>
    );
}
