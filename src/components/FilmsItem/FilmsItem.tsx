import React, { FC, useState } from "react";
import styles from "./FilmsItem.module.scss";
import { Link } from "react-router-dom";
import { formPageSelectedFilms } from "../../app/reducers/films.reducer";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";

interface FilmsItemProps {
  title: string;
  poster: string;
  date: number;
  rating: number;
  id: number;
  genreId: any;
}

const FilmsItem: FC<FilmsItemProps> = (props: any) => {
  const { title, poster,  date, rating, id, genreId} = props;
  const urlPoster = process.env.REACT_APP_URL_POSTER;
 

  const genre: any = useSelector( (state: any) => state.films.genre);
  
   
   
  const genreFilms = genre.filter( (i: any) => {
    return genreId.some( (i2: any) => {
        if (i.id === i2) {
          return i;
        }
    });
  });
  
  return (
    <div className={styles.filmForm}>
      <Link to={`/films/${id}`}>
        <div className={styles.FilmsItem}>
          <img
            width={300}
            height={450}
            src={`${urlPoster}${poster}`}
            alt={title}
          />
          <div className={styles.genre_Film}>
            <p>Жанр: {genreFilms.map((item: any) => `${item.name} `)}</p>
          </div>
          <div className={styles.footer_item}>
            <h4 className={styles.title_Film}>{title}</h4>
            <div>&#9733; {rating.toFixed(1)}</div>
            <div className={styles.date}>{new Date(date).getFullYear()}</div>
          </div>
        </div>
      </Link>
      <div className={styles.btn}>
        <Button  title ={title}
               poster = {poster}
               date = {date}
               rating = {rating}
               id = {id}
               genreId = { genreId} />
      </div>
    </div>
  );
};

export default FilmsItem;
