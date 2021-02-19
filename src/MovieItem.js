export function MovieItem(props) {
    const title = props.title;
    const releaseYear = props.releaseYear;
    const rating = props.rating;
    const country = props.country;

    return (
        <tr>
            <td>{title}</td>
            <td>{releaseYear}</td>
            <td>{rating}</td>
            <td>{country}</td>
        </tr>
    )
}