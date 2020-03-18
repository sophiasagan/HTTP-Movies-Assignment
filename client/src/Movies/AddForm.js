import React, { useState, useEffect } from 'react'
import axios from 'axios'

const initialState = {
    id: Date.now(),
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const AddForm = props => {
    
    const [movie, setMovie] = useState(initialState);
    const [starInput, setStarInput] = useState("");

    const { id } = props.match.params;

    useEffect(() => {
        if (id)
            axios
                .get(`http://localhost:5000/api/movies/${id}`)
                .then(res => setMovie(res.data))
                .catch(err => console.error(err));
    }, []);

    const addStar = name => {
        if (name) {
            setMovie({ ...movie, stars: [...movie.stars, name] });
            setStarInput("");
        } else {
            alert("Please type something");
        }
    };

    const handleChange = e =>
        setMovie({ ...movie, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        if (!id) {
            //Send a POST request if params.match.id does not exist
            axios
                .post("http://localhost:5000/api/movies", movie)
                .then(res => {
                    console.log(res.data);
                    setMovie(initialState); // Clear form after submit
                    props.history.push("/");
                })
                .catch(err => console.error(err));
        } else {
            // Send a PUT request if params.match.id exists
            axios
                .put(`http://localhost:5000/api/movies/${id}`, movie)
                .then(res => {
                    console.log(res.data);
                    setMovie(initialState); // Clear form after submit
                    props.history.push("/");
                })
                .catch(err => console.error(err));
        }
    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">
                    Title:{" "}
                    <input
                        id="title"
                        name="title"
                        value={movie.title}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="metascore">
                    Director:{" "}
                    <input
                        id="director"
                        name="director"
                        value={movie.director}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="metascore">
                    Metascore:
            <input
                        id="metascore"
                        name="metascore"
                        value={movie.metascore}
                        onChange={handleChange}
                    />
                </label>
                <div className="stars">
                    Stars:
            {movie.stars.map((star, index) => (
                    <span key={index} className="star">
                        {star}{" "}
                        <span
                            className="delete"
                            onClick={() =>
                                setMovie({
                                    ...movie,
                                    stars: movie.stars.filter((star, idx) => index !== idx)
                                })
                            }
                        >
                </span>
                    </span>
                ))}
                </div>
                <label htmlFor="star">
                    Add Star:
            <input
                        name="star"
                        value={starInput}
                        onChange={e => setStarInput(e.target.value)}
                    />
                    <button
                        onClick={e => {
                            e.preventDefault();
                            addStar(starInput);
                        }}
                    >
                        Add
            </button>
                </label>
                <button type="submit">Add Movie</button>
            </form>
        </div>
    );
};
export default AddForm