import React from 'react';
import { MovieItem } from './MovieItem.js'

export default function MovieList({ movies }) {
  const movieList = movies.map(movie => (<MovieItem {...movie} />))
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Release Year</th>
            <th>Rating</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {movieList}
        </tbody>
      </table>
    </div>
  )
}
