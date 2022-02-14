import {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { useSelector } from "react-redux";
import FilmPage from "./components/FilmPage/FilmPage";
import FilmsList from "./components/FilmsList/FilmsList";
import Header from "./components/Header/Header";
import SelectedFilms from "./components/SelectedFilms/SelectedFilms";

function App() {
  const  selectedFilm: any = useSelector( (state: any) => state.films.selectedFilms);
    
  let local: any = localStorage.getItem('likeFilms');
  let localParse = JSON.parse(local);
  
  const [likeFilms, setLikeFilms] : any = useState(localParse || []);
  
  useEffect(() => {
    setLikeFilms([...selectedFilm]);
  }, [selectedFilm]);

  useEffect(() => {
    localStorage.setItem('likeFilms', JSON.stringify(likeFilms));
   }, [likeFilms]);
    
   return (
    <BrowserRouter>
      <Header /> 
      <Routes>
        <Route path="/" element={<FilmsList />} />
        <Route path="/Selected_Films" element={<SelectedFilms likeFilms={likeFilms} />} />
        <Route path="/films/:id" element={<FilmPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
