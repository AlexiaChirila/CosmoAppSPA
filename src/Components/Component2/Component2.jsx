export default function Component2({setCount}) {
    return (
        <div>
            <button onClick={() => setCount(counter => counter + 1)}> Click me</button>
        </div>
    );
}