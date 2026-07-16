export default function PhotoCard({ photo }) {
    return (
        <article className="photo-card">
            <h2>{photo.title}</h2>
                <img
                    src={photo.url}
                    alt={photo.title}
                    className="photo-image"
                />
            <p className="photo-date">
                <strong>Date:</strong> {photo.date}
            </p>

            <p>{photo.explanation}</p>
            <hr/>
        </article>
    );
}