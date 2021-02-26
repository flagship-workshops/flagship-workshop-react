import React from 'react';
import { movies } from './movies.js'
import MovieList from './MovieList.js'

export default function App() {

  return (
    <div>
      <MovieList movies={movies} />
    </div>
  )
}
