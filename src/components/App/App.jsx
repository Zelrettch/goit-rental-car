// import css from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import CatalogPage from "../../pages/CatalogPage/CatalogPage";
import DetailsPage from "../../pages/DetailsPagae/DetailsPage";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCatalog } from "../../redux/catalog/operations.js";
import Header from "../Header/Header.jsx";
import css from "./App.module.css";
import ErrorPage from "../../pages/ErrorPage/ErrorPage.jsx";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    dispatch(fetchCatalog({ page: 1, signal: abortController.signal }));

    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <div className={css.content}>
      <Header />
      <div className={css.page}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<DetailsPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}
