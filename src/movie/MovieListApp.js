import React from 'react';
import { movies } from './movies'
import MovieList from './MovieList'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './MovieList.css';

export default function MovieListApp(props) {

    function handleSubmit(event) {
        event.preventDefault();
        props.handleClick();
    }

    return (
        <div className="MovieList">
            <h2>Hello {props.email}</h2>
            <MovieList movies={movies} />
            <Form onSubmit={handleSubmit}>
                <Button block size="lg" type="submit">Logout</Button>
            </Form>
        </div>
    )
}
