import { Link } from "react-router-dom";
import css from "./CarCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleItem } from "../../redux/favourites/actions";
import HeartEnabled from "../../svg/heart_active.svg?react";
import HeartDisabled from "../../svg/heart_disabled.svg?react";
import { selectFavourites } from "../../redux/favourites/selectors";
import addSpaceFromEnd from "../../util/addSpaceFromEnd";

export default function CarCard({ car }) {
  const city = car.address.split(",")[1]?.trim() || "Unknown City";
  const country = car.address.split(",")[2]?.trim() || "Unknown Country";

  const formattedMileage = addSpaceFromEnd(String(car.mileage));

  const favourites = useSelector(selectFavourites);
  const isFavourite = favourites.some((item) => item.id === car.id);
  const dispatch = useDispatch();

  return (
    <li className={css.card}>
      <div className={css.thumb}>
        <img src={car.img} alt={car.brand} className={css.img} />
      </div>
      <div className={css.header}>
        <h2 className={css.title}>
          {car.brand} <span className={css.model}>{car.model}</span>, {car.year}
        </h2>
        <p className={css.rentalPrice}>${car.rentalPrice}</p>
      </div>
      <div className={css.locationContainer}>
        <p className={css.desc}>{city}</p>
        <p className={css.desc}>{country}</p>
        <p className={css.desc}>{car.rentalCompany}</p>
      </div>
      <div className={css.featuresContainer}>
        <p className={css.desc}>{car.type}</p>
        <p className={css.desc}>{formattedMileage}</p>
      </div>
      <Link to={`/catalog/${car.id}`} className={css.button}>
        Read more
      </Link>

      <button
        onClick={() => dispatch(toggleItem({ id: car.id }))}
        className={css.favouriteBtn}
      >
        {isFavourite ? (
          <HeartEnabled className={css.heart} />
        ) : (
          <HeartDisabled className={css.heart} />
        )}
      </button>
    </li>
  );
}
