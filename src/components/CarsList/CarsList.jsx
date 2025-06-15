import { useSelector } from "react-redux";
import { selectItems } from "../../redux/catalog/selectors";
import CarCard from "../CarCard/CarCard";
import css from "./CarsList.module.css";

export default function CarsList() {
  const items = useSelector(selectItems);
  console.log("CarsList items:", items);
  return (
    <ul className={css.list}>
      {items.map((item) => (
        <CarCard car={item} key={item.id} />
      ))}
    </ul>
  );
}
