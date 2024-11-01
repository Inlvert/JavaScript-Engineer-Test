import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Header.module.scss";
import classNames from "classnames";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuClass = classNames(style.navList, {
    [style.hiddenDisplay]: isMenuOpen,
  });

  return (
    <header className={style.headerCover}>
      <div className={style.container}>
        <a href="/">
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="logo"
            className={style.logo}
          />
        </a>
        <nav className={style.nav}>
          <button className={style.burger} id="burger" onClick={handleClick}>
            <div className={style.burgerLine}></div>
            <div className={style.burgerLine}></div>
            <div className={style.burgerLine}></div>
          </button>
          <ul className={menuClass}>
            <li className={style.navListItem}>
              <Link to="/" className={style.navLink}>
                Home
              </Link>
            </li>
            <li className={style.navListItem}>
              <Link to="/superheroes" className={style.navLink}>
                Add Superhero
              </Link>
            </li>
            <li className={style.navListItem}></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
