import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';


import MovieCard from './MovieCard';

function Movie(props, { addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const handleUpdate = e => {
    e.preventDefault();
    props.history.push(`/update-movie/${movie.id}`);
  };

  const handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res=> {
        props.refreshMovies();
        props.history.push('/')
      })
      .catch(err => console.log(err))

  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <button className='save-button' onClick={saveMovie}>
        Save
      </button>
      <button className="update-button" onClick={handleUpdate}>
        Edit
      </button>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default Movie;