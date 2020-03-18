import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useParams} from 'react-router-dom';

const UpdateForm = props => {
    const initialState = {
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    }
    const [movie, setMovie] = useState(initialState)
    const {id} = {useParams}
    useEffect(() => {
        const movieToUpdate = props.movieList.find(movie => `${movie.id}` === id);

        if(movieToUpdate){
            console.log('movieToUpdate', movieToUpdate);
            setMovie({...movieToUpdate, stars: movieToUpdate.stars.join(', ')});
        }
    }, [props.movieList, id]);

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;

        setMovie({
            ...movie,
            [e.target.name]: value
        });
    }

    const handleSubmit = event => {
        event.preventDefault();

        movie.stars = movie.stars.split(', ');

        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                setMovie(initialState); // Clear form after submit
                props.history.push('/');
            })
            .catch(err => console.log(err))
    };
    
    return (
        <div>
            <h3>Update Movie</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    placeholder='Title'
                    value={movie.title}
                />

                <input 
                    type='text'
                    name='director'
                    onChange={changeHandler}
                    placeholder='Director'
                    value={movie.director}
                />

                <input 
                    type='number'
                    name='metascore'
                    onChange={changeHandler}
                    placeholder='Metascore'
                    value={movie.metascore}
                />

                <input 
                    type='text'
                    name='stars'
                    onChange={changeHandler}
                    placeholder='Stars'
                    value={movie.stars}
                />
                <button type='submit' >Update Movie</button>
            </form>
        </div>
    );
};


export default UpdateForm;