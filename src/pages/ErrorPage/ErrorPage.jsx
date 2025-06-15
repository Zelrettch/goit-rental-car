import css from "./ErrorPage.module.css";

export default function ErrorPage() {
  return (
    <div className={css.container}>
      <h1 className={css.header}>
        Something <span className={css.span}>went </span>wrong
        <span className={css.span}>...</span>
      </h1>
    </div>
  );
}
