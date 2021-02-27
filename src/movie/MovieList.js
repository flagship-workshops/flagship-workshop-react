import React from 'react';
import Table from "react-bootstrap/Table";
import { MovieItem } from './MovieItem.js';

export default function MovieList({ movies }) {
  const movieList = movies.map(movie => (<MovieItem {...movie} key={Math.random()}/>))
  
  return (
    <div>
      <Table striped bordered hover>
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
      </Table>
    </div>
  )
}
