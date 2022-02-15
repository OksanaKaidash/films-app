import React, { FC, useState, useEffect} from "react";
import { useDispatch,  useSelector } from "react-redux";
import styles from "./Button.module.scss";
import { formPageSelectedFilms } from "../../app/reducers/films.reducer";


interface ButtonProps {
    title: string;
    poster: string;
    date: number;
    rating: number;
    id: number;
    genreId: any;}

const Button: FC<ButtonProps> = (props) => {
  const  selectedFilm: any = useSelector( (state: any) => state.films.selectedFilms);
  const dispatch = useDispatch();
  const {id} = props
       
  const [isClass, setClass] = useState(false);

  const likeFilm = () => {
    dispatch(formPageSelectedFilms(props));   
  };

   const like = selectedFilm.find( (film: any) => {
        if (film.id === id) {
            return true
        } else {
           return false
        }
    }); 
    
    useEffect ( () => {
        setClass(like);
    },[selectedFilm]);
   
    
   return (
      <button onClick={likeFilm} className={`${isClass ? styles.Like : styles.noLike}`}>
           &#10084;
      </button>
    );
};

export default Button;