import React, { useState } from 'react';
import { SplitFactory, SplitTreatments } from '@splitsoftware/splitio-react';
import { appConfig } from '../app.config';
import { movies } from './movies'
import MovieList from './MovieList'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './MovieList.css';

export default function SplitMovieListApp(props) {

    // Filter that accepts only USA movies
    const usaMoviesFilter = (movie) => movie.country === appConfig.split.usaTreatment;

    // Filter that accepts all movies
    const allMoviesFilter = () => true;

    function handleSubmit(event) {
        event.preventDefault();
        props.handleClick();
    }

    const splitFactoryConfig = {
        core: {
            authorizationKey: appConfig.split.authorizationKey,
            key: props.email,
        }
    }

    const [useAllFilter, setUseAllFilter] = useState(false);

    return (
        <SplitFactory config={splitFactoryConfig} updateOnSdkUpdate={true} >
            <SplitTreatments /* names: list of features to evaluate */ names={[appConfig.split.treatmentName]} >{
                ({ isReady, treatments }) => {
                    if (isReady) {
                        // once the SDK is ready, `treatments` contains valid values of the evaluated list of features

                        let treatment = treatments[appConfig.split.treatmentName].treatment;
                        console.log(`treatment: ${treatment}`);

                        let filter;
                        if (treatment === appConfig.split.intlTreatment && useAllFilter) {
                            filter = allMoviesFilter;
                        } else {
                            filter = usaMoviesFilter;
                            setUseAllFilter(false);
                        }

                        const filteredMovies = movies.filter(filter);
                        return (
                            <div className="MovieList">
                                <h2>Hello {props.email}</h2>
                                {treatment === appConfig.split.intlTreatment &&
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
