import React from 'react';
import { movies } from './movies.js'
import MovieList from './MovieList.js'
import { SplitFactory, SplitTreatments } from '@splitsoftware/splitio-react';

const usaFilter = (movie) => movie.country === 'USA';

const defaultFilter = (movie) => !usaFilter(movie);

export const localhostSplitConfig = {
  core: {
    authorizationKey: 'localhost',
    key: 'anonymous_user',
  },
  features: {
    'movie_filter': 'USA',
  }
}

export default function App() {
  return (
    <SplitFactory config={localhostSplitConfig} >
      <SplitTreatments /* names: list of features to evaluate */ names={['movie_filter']} >{
        ({ isReady, treatments }) => {
          if (isReady) {
            // once the SDK is ready, `treatments` contains the values of the evaluated list of features

            // we use the 'movie_filter' feature treatment to choose a filter in order to customize the content we show to the user
            let filter = defaultFilter;

            // if the treatment value is 'USA' it will shows the movies with 'USA' as the country.
            // Otherwise, the default filter will exclude movies with 'USA' as country
            if (treatments['movie_filter'].treatment === 'USA') filter = usaFilter;

            const filteredMovies = movies.filter(filter);
            return (<MovieList movies={filteredMovies} />);
          }

          return (<div>Loading SDK...</div>);
        }
      }</SplitTreatments>
    </SplitFactory>
  )
}
