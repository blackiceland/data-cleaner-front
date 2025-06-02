import { useState } from 'react';
import { fetchActiveRange } from './lib/sheets';

export default function App() {
    const [text, setText] = useState('Выделите диапазон в таблице, затем нажмите кнопку');

    async function handleClick() {
        try {
            const rows = await fetchActiveRange();
            setText(`Строк получено: ${rows.length}`);
        } catch (e) {
            setText('Ошибка: данные из Sheets не пришли (смотрите консоль)');
            console.error(e);
        }
    }

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Data Cleaner Dev UI</h2>
            <button onClick={handleClick}>Считать диапазон</button>
            <p>{text}</p>
        </div>
    );
}
