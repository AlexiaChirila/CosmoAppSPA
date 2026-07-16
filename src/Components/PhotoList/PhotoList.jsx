import PhotoCard from "../PhotoCard/PhotoCard.jsx";
import './PhotoList.css';

export default function PhotoList({ photos }) {
    if (!photos.length) {
        return <>
            </>;
    }

    return (
        <section className="photo-list">
            {photos.map((photo) => (
                <PhotoCard
                    key={`${photo.date}-${photo.title}`}
                    photo={photo}
                />
            ))}
        </section>
    );
}