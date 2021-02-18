export function MovieItem(props){
    const title = props.title;
    const releaseYear = props.releaseYear;
    const rating = props.rating;
    const country = props.country;

    return(
        <div>
            <div>
                {title}
            </div>
            <div>
                {releaseYear}
            </div>
            <div>
                {rating}
            </div>
            <div>
                {country}
            </div>
        </div>
    )

}