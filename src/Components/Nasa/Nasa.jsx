import DatePicker from 'react-datepicker';
import {useState} from "react";
import axios from "axios";
import PhotoList from "../PhotoList/PhotoList.jsx";

export default function Nasa() {

    const [mode, setMode] = useState("none");
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState([]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            let params = {};

            if (mode === "date") {
                params.date = date.toISOString().split("T")[0];
            }

            if (mode === "range") {
                params.start_date = startDate.toISOString().split("T")[0];
                params.end_date = endDate.toISOString().split("T")[0];
            }

            if (mode === "random") {
                params.count = count;
            }

            const response = await axios.get("http://localhost:8000/apod/photos/", {params});

            const data = Array.isArray(response.data)
                ? response.data
                : [response.data];

            setPhotos(data);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }

        setMode("none");
    };

    return (
        <>
            <title>Nasa Search API</title>
            <h1>Welcome to Nasa Search API Form</h1>
            <h3>Let's take a look </h3>
            <form onSubmit={handleSubmit}>
                <div>
                    Please choose how to search for photos:
                    <br/>
                    <label>
                        <input
                            type="radio"
                            value="date"
                            checked={mode === "date"}
                            onChange={(e) => setMode(e.target.value)}
                        />
                        Single Date
                    </label>
                    <br/>
                    <label>
                        <input
                            type="radio"
                            value="range"
                            checked={mode === "range"}
                            onChange={(e) => setMode(e.target.value)}
                        />
                        Date Range
                    </label>
                    <br/>
                    <label>
                        <input
                            type="radio"
                            value="random"
                            checked={mode === "random"}
                            onChange={(e) => setMode(e.target.value)}
                        />
                        Random Photos
                    </label>

                    {mode === "date" && (
                        <div>
                            <hr/>
                            <p>Select a date:</p>

                            <DatePicker
                                selected={date}
                                onChange={(date) => setDate(date)}
                                dateFormat="yyyy-MM-dd"
                                maxDate={new Date()}
                            />
                            <hr/>
                        </div>
                    )}
                    {mode === "range" && (
                        <div>
                            <hr/>
                            <div>
                                <p>Select a start date:</p>

                                <DatePicker
                                    selected={startDate}
                                    onChange={(startDate) => setStartDate(startDate)}
                                    dateFormat="yyyy-MM-dd"
                                    maxDate={new Date()}
                                />
                            </div>

                            <div>
                                <p>Select a end date:</p>

                                <DatePicker
                                    selected={endDate}
                                    onChange={(endDate) => setEndDate(endDate)}
                                    dateFormat="yyyy-MM-dd"
                                    maxDate={new Date()}
                                />
                            </div>
                            <hr/>
                        </div>
                    )}
                    {mode === "random" && (
                        <div>
                            <hr/>
                            <p>Select a number:</p>
                            <input
                                type="number"
                                min="1"
                                max="30"
                                value={count}
                                onChange={(e) => setCount(e.target.value)}
                            />
                            <hr/>
                        </div>
                    )}

                    {mode === "none" && (
                        <div>
                        </div>
                    )}

                    <button type="submit" disabled={loading}>
                        {loading ? "Loading..." : "Search"}
                    </button>

                </div>
            </form>
            <br/>
            <PhotoList photos={photos}/>
        </>
    )
}