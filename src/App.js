import React from 'react';
import {movies} from './movies.js'
import {MovieItem} from './MovieItem.js'

export default class movieList extends React.Component{
  render() {
	const movieList = movies.map(movie => 
		(
      <tr>
        <td><MovieItem title={movie.title} /></td>
        <td><MovieItem releaseYear = {movie.releaseYear} /></td>
        <td><MovieItem rating = {movie.rating} /></td>
        <td><MovieItem country = {movie.country} /></td>
      </tr>
		)
	)
	return (
			<div>
        <table>
          <tr>
            <th>Title</th>
            <th>Release Year</th>
            <th>Rating</th>
            <th>Country</th>
          </tr>
            {movieList}
        </table>
	    </div>
	)
}
}