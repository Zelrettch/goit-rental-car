import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCarData } from "../../api/swagger-api";
import { BookForm } from "../../components/BookForm/BookForm";
import css from "./DetailsPage.module.css";
import Location from "../../svg/location.svg?react";
import addSpaceFromEnd from "../../util/addSpaceFromEnd";
import CheckCircle from "../../svg/check-circle.svg?react";
import CalendarIcon from "../../svg/calendar.svg?react";
import CarIcon from "../../svg/car.svg?react";
import FuelIcon from "../../svg/fuel-pump.svg?react";
import GearIcon from "../../svg/gear.svg?react";

export default function DetailsPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const city = data?.address.split(",")[1]?.trim() || "Unknown City";
  const country = data?.address.split(",")[2]?.trim() || "Unknown Country";

  const mileage = addSpaceFromEnd(String(data?.mileage));

  async function fetchData() {
    try {
      const fetchedData = (await fetchCarData(id)).data;
      setData(fetchedData);
    } catch (e) {
      if (e.status === 404) {
        navigate("/not-found", { replace: true });
      } else {
        navigate("/error", { replace: true });
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleBookSubmit = (formData) => {
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    data && (
      <div className={css.container}>
        <div className={css.left}>
          <div className={css.imageContainer}>
            <img className={css.image} src={data.img} alt={data.make} />
          </div>
          <div className={css.right}>
            <BookForm onSubmit={handleBookSubmit} />
          </div>
        </div>

        <div className={css.description}>
          <div className={css.title}>
            <h2 className={css.name}>
              {data.brand} {data.model}, {data.year}
            </h2>
            <p className={css.id}>id: {data.id}</p>
          </div>
          <div className={css.location}>
            <Location className={css.icon} />
            <p>
              {city}, {country}
            </p>
            <p className={css.mileage}>Mileage: {mileage} km</p>
          </div>
          <p className={css.price}>${data.rentalPrice}</p>
          <p className={css.desc}>{data.description}</p>
          <h3>Rental Conditions:</h3>
          <ul className={css.list}>
            {data.rentalConditions.map((e, k) => (
              <li className={css.checked} key={k}>
                <CheckCircle />
                <p>{e}</p>
              </li>
            ))}
          </ul>
          <h3>Car Specifications:</h3>
          <ul className={css.list}>
            <li className={css.spec}>
              <CalendarIcon />
              <p>Year: {data.year}</p>
            </li>
            <li className={css.spec}>
              <CarIcon />
              <p>Type: {data.type}</p>
            </li>
            <li className={css.spec}>
              <FuelIcon />
              <p>Fuel Consumption: {data.fuelConsumption}</p>
            </li>
            <li className={css.spec}>
              <GearIcon />
              <p>Engine Size: {data.engineSize}</p>
            </li>
          </ul>
          <h3>Accessories and functionalities:</h3>
          <ul className={css.list}>
            {[...data.accessories, ...data.functionalities].map((e, k) => (
              <li className={css.checked} key={k}>
                <CheckCircle />
                <p>{e}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
}
