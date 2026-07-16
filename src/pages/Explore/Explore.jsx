import { useState } from "react";
import axios from "axios";
import "./Explore.css";
import styled, {keyframes} from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 5.2rem;
`;





export default function Explore() {
    const [searchParam, setSearchParam] = useState("");
    const [results, setResults] = useState([]);

    async function handleSearch(e) {
        e.preventDefault();

        try {
            const response = await axios.get(
                "https://images-api.nasa.gov/search",
                {
                    params: {
                        q: searchParam,
                        media_type: "image",
                    },
                }
            );

            setResults(response.data.collection.items);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="explore-page">

            <h1>NASA Image Explorer <Rotate> 🚀 </Rotate></h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchParam}
                    onChange={(e) => setSearchParam(e.target.value)}
                />

                <button>Search</button>
            </form>

            <br/>

            <div className="gallery">
                {results.map((item, index) => (
                    <div className="card" key={index}>
                        <img
                            src={item.links?.[0]?.href}
                            alt={item.data?.[0]?.title}
                        />

                        <h2>{item.data?.[0]?.title}</h2>

                        <p>{item.data?.[0]?.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}