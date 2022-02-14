import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./FilmPage.module.scss";
import {
  fetchFilmPersonalPage,
  fetchRecommendations,
} from "../../app/reducers/films.reducer";
import FilmsItem from "../FilmsItem/FilmsItem";


const urlPosterPage = process.env.REACT_APP_URL_POSTER;

interface FilmPageProps {}

const FilmPage: FC<FilmPageProps> = () => {
  const { id }: any = useParams();
  const dispatch = useDispatch();
  const info = useSelector((state: any) => state.films.filmPersonalPage);
  const recommendations = useSelector(
    (state: any) => state.films.recommendations
  );

  useEffect(() => {
    dispatch(fetchFilmPersonalPage(id));
    dispatch(fetchRecommendations(id));
  });

  const displayRecommendations = recommendations.slice(0,4).map(
    (film: any, index: number) => {
      return <FilmsItem key={index}
              id={film.id}
              title={film.title}
              poster={film.poster_path}
              date={film.release_date}
              rating={film.vote_average}
              genreId={film.genre_ids}
            />
    }
  );

  return (
    <div className={styles.filmPage}>
      <div className={styles.poster}>
        <img
          width={250}
          height={400}
          src={`${urlPosterPage}${info?.poster_path}`}
          alt="img"
        />
        <img className={styles.backdrop_path}
          width={550}
          height={400}
          src={`${urlPosterPage}${info?.backdrop_path}`}
          alt="img"
        />
      </div>
      <h1>{info?.title}</h1>
      <p>({new Date(info?.release_date).getFullYear()})</p>
      <div className={styles.filmPageInfo}>
        <p>
          <span className={styles.span}>Мировая премьера</span>:{" "}
          {`${new Date(info?.release_date).getDate()}-${new Date(
            info?.release_date
          ).getMonth()}-${new Date(info?.release_date).getFullYear()}`}
        </p>
        <p>
          <span className={styles.span}>Статус</span>: {info?.status}
        </p>
        <p>
          <span className={styles.span}>Рейтинг</span>: &#9733; {info?.vote_average} /{" "}
          {info?.vote_count} голосов
        </p>
        <p>
          <span className={styles.span}>Жанр</span>: {info?.genres.map((item: any) => `${item.name} `)}
        </p>
        <p className={styles.overview}>{info?.overview}</p>
        <span className={styles.span}>C этим фильмом рекомендуем посмотреть</span>
      </div>
      <div className={styles.recItem}>
        {displayRecommendations}
      </div>
    </div>
  );
};

export default FilmPage;
