import Constants from 'expo-constants';
import axios from 'axios';

const apiKey = Constants?.manifest?.extra?.API_KEY ?? 'e75eff265690ebd0306634fcc99480b0';
const baseURL = `https://api.themoviedb.org/3`;

const trendingMoviesEndpoint = `${baseURL}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${baseURL}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${baseURL}/movie/top_rated?api_key=${apiKey}`;

const movieDetailsEndpoint = (id: number) => `${baseURL}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = (id: number) => `${baseURL}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = (id: number) => `${baseURL}/movie/${id}/similar?api_key=${apiKey}`;

const apiCall = async (
  endpoint: string,
  params?: Record<string, number | string> | {}
): Promise<APIResponse | null> => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error: any) {
    console.log(error, 'FETCH_ERROR');
    return null;
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};

export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
};

export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};

export const fetchMovieDetails = (id: number) => {
  return apiCall(movieDetailsEndpoint(id));
};

export const fetchMovieCredits = (id: number) => {
  return apiCall(movieCreditsEndpoint(id));
};

export const fetchSimilarMovies = (id: number) => {
  return apiCall(similarMoviesEndpoint(id));
};

export const fetchImageWidth500 = (path: string | undefined): string | undefined =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : undefined;

export const fetchImageWidth342 = (path: string | undefined): string | undefined =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : undefined;

export const fetchImageWidth185 = (path: string | undefined): string | undefined =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : undefined;

export const fallbackMoviePoster =
  'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';
