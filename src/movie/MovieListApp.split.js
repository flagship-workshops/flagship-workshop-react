import React, { useState } from 'react';
import { movies } from './movies.js'
import MovieList from './MovieList.js'
import { SplitFactory, SplitTreatments } from '@splitsoftware/splitio-react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SplitMovieListApp(props) {

    // Filter that accepts only USA movies
    const usaFilter = (movie) => movie.country === 'USA';

    // Filter that accepts all movies
    const allMoviesFilter = () => true;

    function handleSubmit(event) {
        event.preventDefault();
        props.handleClick();
    }

    const splitConfig = {
        core: {
            authorizationKey: '<your split auth key>',
            key: props.email,
        },
        features: {
            'movie_filter': 'default',
        }
    }

    const [useDefaultFilter, setDefaultFilter] = useState(true);

    return (
        <SplitFactory config={splitConfig} updateOnSdkUpdate={true} >
            <SplitTreatments /* names: list of features to evaluate */ names={['movie_filter']} >{
                ({ isReady, treatments }) => {
                    if (isReady) {
                        // once the SDK is ready, `treatments` contains valid values of the evaluated list of features

                        // set the default filter to use based on the checkbox
                        let filter = useDefaultFilter ? allMoviesFilter : usaFilter;

                        // if the treatment value is 'USA', we use the USA filter instead of the default one.
                        if (treatments['movie_filter'].treatment === 'USA') filter = usaFilter;

                        const filteredMovies = movies.filter(filter);
                        return (
                            <div>
                                <h2>Hello {props.email}</h2>
                                <div>
                                    <input type="checkbox" id="filter" checked={useDefaultFilter} onChange={() => { setDefaultFilter(!useDefaultFilter) }} />
                                    <label htmlFor="filter">Show International Movies</label>
                                </div>
                                <MovieList movies={filteredMovies} />
                                <Form onSubmit={handleSubmit}>
                                    <Button block size="lg" type="submit">
                                        Logout
                                    </Button>
                                </Form>
                            </div>
                        );
                    }

                    return (<div>Loading SDK...</div>);
                }
            }</SplitTreatments>
        </SplitFactory>
    )
}
