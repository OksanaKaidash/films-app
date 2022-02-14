import React, { FC } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSearchFilms } from '../../app/reducers/films.reducer';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const dispatch = useDispatch();

  const searchFilms = (event: any) => {
    event.preventDefault();
    const query: any = event.target[0].value;

    dispatch(fetchSearchFilms({query}));
    
    event.target[0].value ='';
  };

  return (
    <div className={styles.Header}>
      <div className={styles.headerLink}>
        <Link to={"/"}>Популярные фильмы</Link>
        <Link to={"/Selected_films"}>Избранные фильмы</Link>
      </div>
      <div className={styles.search}>
        <form onSubmit={searchFilms} className={styles.searchForm}>
           <input  className={styles.inputSearch} type="text" />
          <button className={styles.btnSearch}>
            <span className={styles.spanSearch}>&#9740;</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
