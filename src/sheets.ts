export async function fetchActiveRange(): Promise<string[][]> {
    return new Promise((resolve, reject) => {
        function onMessage(ev: MessageEvent) {
            if (ev.data?.type === 'range') {
                window.removeEventListener('message', onMessage);
                resolve(ev.data.payload as string[][]);
            }
            if (ev.data?.type === 'error') {
                window.removeEventListener('message', onMessage);
                reject(new Error(String(ev.data.payload)));
            }
        }
        window.addEventListener('message', onMessage);
        window.parent.postMessage('askRange', '*');
    });
}
