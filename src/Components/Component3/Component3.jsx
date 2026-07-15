import Component4 from "../Component4/Component4.jsx";

export default function Component3({counter})
{
    return (
        <>
            <Component4 counter={counter}/>
            <p>You clicked {counter} times</p>
        </>
    );
}