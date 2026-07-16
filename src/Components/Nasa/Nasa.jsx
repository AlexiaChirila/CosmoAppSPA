export default function Nasa(props) {
    return (
       <>
           <title>{props.title}</title>
           <p>{props.paragraph1}</p>
           <p>{props.paragraph2}</p>
           <img src={props.imagePath} alt="nasa" />
       </>
    )
}

