import React, { useState, useEffect } from 'react';

export function Counter() {
    const [count, setCount] = useState(Number(localStorage.getItem('counter'))||0);

    useEffect(() => {
        localStorage.setItem("counter", count);
        document.title = `You clicked ${count} times`;
    }, [count]);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}