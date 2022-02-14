import React, { FC} from "react";
import { useSelector } from "react-redux";
import FilmsItem from "../FilmsItem/FilmsItem";
import styles from "./SelectedFilms.module.scss";

interface SelectedFilmsProps {likeFilms: any}

const SelectedFilms: FC<SelectedFilmsProps> = ({likeFilms}) => {
  
  const  selectedFilm: any = useSelector( (state: any) => state.films.selectedFilms);
 
    

   
  const displaySelectedFilms = likeFilms.map( (film: any) => {
    return <FilmsItem  {...film}/>
  });

  return (
    <div className={styles.SelectedFilms}>
      {displaySelectedFilms}
    </div>
  );
};

export default SelectedFilms;
