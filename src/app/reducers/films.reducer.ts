import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const apiKey = process.env.REACT_APP_API_KEY;
const urlHash = process.env.REACT_APP_URL_HASH;

interface IFilmsState {
  popular: {
   totalPages: null,
   results: any[],
  },
  genre: any [],
  filmPersonalPage: null,
  recommendations: any[],
  searchFilms: {
    searchTotalPages: null,
    searchResults: any[],
    query: string,
  },
  selectedFilms: any[];
};

const initialState = {
  popular: {
    totalPages: null,
    results: [],
  },
  genre: [],
  filmPersonalPage: null,
  recommendations: [],
  searchFilms: {
    searchTotalPages: null,
    searchResults: [],
    query: "",
  },
  selectedFilms: [],
} as IFilmsState;

export const fetchFilmsPages = createAsyncThunk(
    'films/fetchFilmsPages',
    async (page: number = 1) => {
      const response = await fetch(`${urlHash}/movie/popular?api_key=${apiKey}&page=${page}&language=ru`)
      .then(r => r.json())
      .then(json => json);
     
      return {
        totalPages: response.total_pages,
        results: response.results,
      }
    }
);
 
export const fetchGenre = createAsyncThunk(
  'films/fetchGenre',
  async () => {
    const response = await fetch(`${urlHash}/genre/movie/list?api_key=${apiKey}&language=ru`)
    .then(r => r.json())
    .then(json => json);
   
    return response.genres;
  }
);

export const fetchFilmPersonalPage = createAsyncThunk(
  'films/fetchFilmPersonalPage',
  async (id: number) => {
    const response = await fetch(`${urlHash}/movie/${id}?api_key=${apiKey}&language=ru`)
    .then(r => r.json())
    .then(json => json);
   
    return response;
  }
);

export const fetchRecommendations = createAsyncThunk(
  'films/fetchRecommendations',
  async (id: number) => {
    const response = await fetch(`${urlHash}/movie/${id}/recommendations?api_key=${apiKey}&language=ru&page=1`)
    .then(r => r.json())
    .then(json => json);
   
    return response.results;
  }
);

export const fetchSearchFilms =  createAsyncThunk(
  'films/fetchSearchFilms',
  async ({query}: any) => {
    const response = await fetch(`${urlHash}/search/movie?api_key=${apiKey}&language=ru&query=${query}&page=1&include_adult=false`)
    .then(r => r.json())
    .then(json => json);
   
    return { 
      searchTotalPages: response.total_pages,
      searchResults: response.results,
      query: query,
    };
  }
);

export const SearchPages = createAsyncThunk(
  'films/SearchPages',
  async ({query, page}: any) => {
    const response = await fetch(`${urlHash}/search/movie?api_key=${apiKey}&language=ru&query=${query}&page=${page}&include_adult=false`)
    .then(r => r.json())
    .then(json => json);
   
    return { 
      searchTotalPages: response.total_pages,
      searchResults: response.results,
    }
  }
);

const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {
      formPageSelectedFilms(state, action: any) {
        const newSelectedFilms = state.selectedFilms.find( (film: any) => {
            return film.id === action.payload.id
          }); 
        if (newSelectedFilms) {
            state.selectedFilms = state.selectedFilms.filter( (film: any) => {
            return film.id !== newSelectedFilms.id;
          }); 
          return
        };

        state.selectedFilms.push(action.payload);
      },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchFilmsPages.fulfilled, (state, action) => {
        state.popular.results.push(...action.payload.results);
        state.popular.totalPages = action.payload.totalPages;
      });
      builder.addCase(fetchGenre.fulfilled, (state, action) => {
        state.genre = [...action.payload];
      });
      builder.addCase(fetchFilmPersonalPage.fulfilled, (state, action) => {
        state.filmPersonalPage = {...action.payload};
      });
      builder.addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.recommendations = [...action.payload];
      });
      builder.addCase(fetchSearchFilms.fulfilled, (state, action) => {
        state.searchFilms.searchResults = [...action.payload.searchResults];
        state.searchFilms.searchTotalPages = action.payload.searchTotalPages;
        state.searchFilms.query = action.payload.query;
      });
      builder.addCase(SearchPages.fulfilled, (state, action) => {
        state.searchFilms.searchResults.push(...action.payload.searchResults);
        state.searchFilms.searchTotalPages = action.payload.searchTotalPages;
      });
    },
});

export const { formPageSelectedFilms } = filmsSlice.actions
export default filmsSlice.reducer