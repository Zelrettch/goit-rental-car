import { useState, useEffect } from "react";
import { fetchBrands } from "../../api/swagger-api.js";
import toast from "react-hot-toast";
import SearchForm from "../../components/SearchForm/SearchForm.jsx";
import { useSelector } from "react-redux";
import { selectHasNext } from "../../redux/catalog/selectors.js";
import { fetchCatalog } from "../../redux/catalog/operations.js";
import { useDispatch } from "react-redux";
import CarsList from "../../components/CarsList/CarsList.jsx";

import css from "./CatalogPage.module.css";

export default function CatalogPage() {
  const [brands, setBrands] = useState([]);
  const hasNextPage = useSelector(selectHasNext);
  const page = useSelector((state) => state.catalog.page);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadBrands() {
      try {
        const response = await fetchBrands();
        setBrands(response.data);
      } catch {
        toast.error("Failed to fetch brands");
      }
    }
    loadBrands();
  }, []);
  return (
    <div className={css.page}>
      <SearchForm brands={brands} />
      <CarsList />
      {hasNextPage && (
        <button
          className={css.loadMore}
          onClick={() => {
            dispatch(fetchCatalog({ page: page + 1 }));
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
}
