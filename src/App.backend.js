import React, { useEffect, useState } from 'react';
import { movies } from './movies.js'
import MovieList from './MovieList.js'
import { SplitFactory, SplitTreatments } from '@splitsoftware/splitio-react';
// import axios from 'axios';

// Filter that accepts only USA movies
const usaFilter = (movie) => movie.country === 'USA';

// Filter that accepts all movies
const allMoviesFilter = () => true;

export const localhostSplitConfig = {
  core: {
    authorizationKey: 'localhost',
    key: 'anonymous_user',
  },
  features: {
    'movie_filter': 'default',
  }
}

export default function App() {

  const [useDefaultFilter, setDefaultFilter] = useState(true);
  // const [movieData, setMovieData] = useState([]);

  // useEffect(() => {
  //   getMovieData();
  // }, []);

  // const getMovieData = async () => {
  //   const response = await axios.get("https://<your url>.codesandbox.io/api/v1/movies");
  //   setMovieData(response.data.movies);
  // };

  return (
    <SplitFactory config={localhostSplitConfig} updateOnSdkUpdate={true} >
      <SplitTreatments /* names: list of features to evaluate */ names={['movie_filter']} >{
        ({ isReady, treatments }) => {
          if (isReady) {
            // once the SDK is ready, `treatments` contains valid values of the evaluated list of features

            // set the default filter to use based on the checkbox
            let filter = useDefaultFilter ? allMoviesFilter : usaFilter;

            // if the treatment value is 'USA', we use the USA filter instead of the default one.
            if (treatments['movie_filter'].treatment === 'USA') filter = usaFilter;

            const filteredMovies = movies.filter(filter);
            // const filteredMovies = movieData.filter(filter);
            return (
              <div>
                <div>
                  <input type="checkbox" id="filter" checked={useDefaultFilter} onChange={() => { setDefaultFilter(!useDefaultFilter) }} />
                  <label htmlFor="filter">Show International Movies</label>
                </div>
                <MovieList movies={filteredMovies} />
              </div>
            );
          }

          return (<div>Loading SDK...</div>);
        }
      }</SplitTreatments>
    </SplitFactory>
  )
}
