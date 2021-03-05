import React, { useState, useEffect } from 'react';
import MovieList from './MovieList.js'
import { SplitFactory, SplitTreatments } from '@splitsoftware/splitio-react';
import { splitConfig } from '../split.config.js';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './MovieList.css';

export default function SplitMovieListApp(props) {

    // Filter that accepts only USA movies
    const usaMoviesFilter = (movie) => movie.country === splitConfig.usaTreatment;

    // Filter that accepts all movies
    const allMoviesFilter = () => true;

    function handleSubmit(event) {
        event.preventDefault();
        props.handleClick();
    }

    const splitFactoryConfig = {
        core: {
            authorizationKey: splitConfig.authorizationKey,
            key: props.email,
        }
    }

    const [useAllFilter, setUseAllFilter] = useState(false);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovies(props.email);
    }, []);

    const getMovies = async () => {
        const response = await axios.get('https://<your url>.codesandbox.io/api/v1/movies/' + props.email);
        await setMovies(response.data.movies);
    };

    return (
        <SplitFactory config={splitFactoryConfig} updateOnSdkUpdate={true} >
            <SplitTreatments /* names: list of features to evaluate */ names={[splitConfig.treatmentName]} >{
                ({ isReady, treatments }) => {
                    if (isReady) {
                        // once the SDK is ready, `treatments` contains valid values of the evaluated list of features

                        let treatment = treatments[splitConfig.treatmentName].treatment;
                        console.log(`treatment: ${treatment}`);

                        let filter;
                        if (treatment === splitConfig.intlTreatment && useAllFilter) {
                            filter = allMoviesFilter;
                        } else {
                            filter = usaMoviesFilter;
                            setUseAllFilter(false);
                        }

                        const filteredMovies = movies.filter(filter);
                        return (
                            <div className="MovieList">
                                <h2>Hello {props.email}</h2>
                                {treatment === splitConfig.intlTreatment &&
                                    <div>
                                        <label><input
                                            type="checkbox"
                                            checked={useAllFilter}
                                            onChange={() => { setUseAllFilter(!useAllFilter) }}
                                        /> Show International Movies</label>
                                    </div>
                                }
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
