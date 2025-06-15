import { data, Link } from "react-router-dom";
import css from "./HomePage.module.css";
export default function HomePage() {
  return (
    <div className={css.page}>
      <div className={css.data}>
        <h1 className={css.header}>Find your perfect rental car</h1>
        <p className={css.text}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link to="/catalog" className={css.toCatalog}> View Catalog</Link>
      </div>
    </div>
  );
}
