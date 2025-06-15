import { NavLink } from "react-router-dom";
import css from "./Header.module.css";
// For Vite projects
import Logo from "../../svg/logo.svg?react";
import clsx from "clsx";

export default function Header() {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo className={css.logo} />
        <nav>
          <ul className={css.nav}>
            <li className={css.menuItem}>
              <NavLink to="/" className={buildLinkClass}>
                Home
              </NavLink>
            </li>
            <li className={css.menuItem}>
              <NavLink to="/catalog" className={buildLinkClass}>
                Catalog
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
