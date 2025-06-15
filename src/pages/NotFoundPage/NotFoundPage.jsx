import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <h1 className={css.header}>
        404 <span className={css.not}>Not </span>Found
      </h1>
    </div>
  );
}
