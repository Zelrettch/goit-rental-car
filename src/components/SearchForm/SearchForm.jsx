import { useDispatch, useSelector } from "react-redux";
import { fetchCatalog } from "../../redux/catalog/operations.js";
import { selectParams } from "../../redux/catalog/selectors.js";
import { clearItems } from "../../redux/catalog/actions.js";
import { setParams } from "../../redux/catalog/actions.js";
import css from "./SearchForm.module.css";

const priceRange = Array.from({ length: 20 }, (_, i) => (i + 1) * 10);

export default function SearchForm({ brands }) {
  const dispatch = useDispatch();
  const storedParams = useSelector(selectParams);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setParams({ [name]: value || null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearItems());
    dispatch(fetchCatalog({ page: 1 }));
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.brand}>
        Car brand
        <select
          name="brand"
          value={storedParams.brand ?? ""}
          onChange={handleChange}
        >
          <option value="">Choose a brand</option>
          {brands.map((brand, id) => (
            <option key={id} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </label>

      <label className={css.price}>
        Price/ 1 hour
        <select
          name="price"
          value={storedParams.price ?? ""}
          onChange={handleChange}
        >
          <option value="">Choose a price</option>
          {priceRange.map((price) => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
      </label>

      <label className={css.mileage}>
        Car mileage / km
        <div className={css.mileageContainer}>
          <div className={css.mileageFromInput}>
            <span>From</span>

            <input
              type="number"
              name="mileageFrom"
              placeholder=""
              value={storedParams.mileageFrom ?? ""}
              onInput={handleChange}
            />
          </div>
          <div className={css.mileageToInput}>
            <span>To</span>
            <input
              type="number"
              name="mileageTo"
              placeholder=""
              value={storedParams.mileageTo ?? ""}
              onInput={handleChange}
            />
          </div>
        </div>
      </label>

      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}
