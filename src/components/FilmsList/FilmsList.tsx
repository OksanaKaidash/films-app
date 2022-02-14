import React, { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilmsPages, fetchGenre, SearchPages } from '../../app/reducers/films.reducer';
import FilmsItem from '../FilmsItem/FilmsItem';
import Loading from '../Loading/Loading';
import styles from './FilmsList.module.scss';


interface FilmsListProps {}


const FilmsList: FC<FilmsListProps> = () => {
  const dispatch = useDispatch();
  const {results, totalPages} = useSelector( (state: any) => state.films.popular);
  const {searchResults, searchTotalPages, query} = useSelector( (state: any) => state.films.searchFilms);
  const [movie, setMovie]: any[] = useState([]);
  const [page, setPage]: [number, any] = useState(1);
  const [currentPage, setCurrentPage] = useState(true);

      
  useEffect (()=> {
    dispatch(fetchGenre());
  });
  
  useEffect (()=> {
    if (searchResults.length !== 0) {
      setMovie(searchResults);
    } else {
     setMovie(results);
    };
  }, [results, searchResults]);
  
  useEffect (()=> {
    dispatch(fetchFilmsPages(page));
    dispatch(SearchPages({query, page}));
  }, [page]);

  const pageRequest = () => {
    setTimeout(() => setPage(page + 1), 3000); 
  };

  useEffect (()=> {
    if (searchTotalPages) {
      setCurrentPage(searchTotalPages > page);
      return;
    };
    setCurrentPage(totalPages > page);
  }, [totalPages, searchTotalPages]);

  const displayFilms = movie.map( (film: any, i: number) => {
    return <FilmsItem  key={i}
                      id={film.id}
                      title={film.title}
                      poster={film.poster_path}
                      date={film.release_date}
                      rating={film.vote_average}
                      genreId={film.genre_ids}
                      />
  });

  return (
    <InfiniteScroll className={styles.FilmsList}
       dataLength={movie.length} 
       next={pageRequest}
       hasMore={currentPage}
       loader={<Loading/>}
    >
      {displayFilms}
    </InfiniteScroll>   
  )
};

export default FilmsList;