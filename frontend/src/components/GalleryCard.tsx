import { GalleryItem } from "../services/galleryService";
import "../styles/publicPages.css";

interface Props {
  item: GalleryItem;
}

export default function GalleryCard({ item }: Props) {
  const handleView = () => {
    window.open(item.GooglePhotosAlbumLink, "_blank");
  };

  return (
    <div className="pub-gallery-card" onClick={handleView}>
      <div className="pub-gallery-card__img-wrap">
        {item.CoverImageURL ? (
          <img
            src={item.CoverImageURL}
            alt={item.EventName}
            className="pub-gallery-card__img"
            onError={e => {
              const el = e.target as HTMLImageElement;
              el.style.display = "none";
              const ph = el.parentElement?.querySelector(".pub-gallery-card__placeholder") as HTMLElement;
              if (ph) ph.style.display = "flex";
            }}
          />
        ) : null}
        <div className="pub-gallery-card__placeholder" style={{ display: item.CoverImageURL ? "none" : "flex" }}>
          <span>📷</span>
        </div>
        <div className="pub-gallery-card__overlay">
          <span className="pub-gallery-card__view-btn">📸 View Album</span>
        </div>
      </div>

      <div className="pub-gallery-card__body">
        <div className="pub-gallery-card__year">{item.Year}</div>
        <h3 className="pub-gallery-card__name">{item.EventName}</h3>
        {item.EventDate && <p className="pub-gallery-card__date">📅 {item.EventDate}</p>}
        {item.Description && <p className="pub-gallery-card__desc">{item.Description}</p>}
        <button className="pub-btn pub-btn--gold pub-gallery-card__btn" onClick={handleView}>
          🔗 Album पाहा
        </button>
      </div>
    </div>
  );
}
