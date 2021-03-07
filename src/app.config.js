export const appConfig = {
    split: {
        authorizationKey: 'localhost', // update to real authorization key
        treatmentName: 'movie_filter',
        intlTreatment: 'INTERNATIONAL',
        usaTreatment: 'USA'
    },
    backend: {
        baseUrl: 'https://<your unique url>.codesandbox.io',
        moviesUri: '/api/v1/movies/'
    }
}