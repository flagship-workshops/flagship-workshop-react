import React from 'react';
import {movies} from './movies.js'
import {MovieItem} from './MovieItem.js'

export default class movieList extends React.Component{
  render() {
    return movies.map(movie =>
      (
        <div>
        <MovieItem title={movie.title} releaseYear = {movie.releaseYear} rating = {movie.rating} country = {movie.country} />
      </div>
      )
    )
  }
}