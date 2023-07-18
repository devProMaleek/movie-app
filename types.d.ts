interface APIResponse extends MovieAPIResponse {
  id: number;
  cast: Cast[];
  crew: Crew[];
  dates?: DateRange;
}

interface MovieAPIResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

interface CastAPIResponse {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | undefined;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | undefined;
  credit_id: string;
  department: string;
  job: string;
}

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface ExtendedMovie extends Movie {
  belongs_to_collection: any | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  imdb_id: string;
  production_companies: {
    id: number;
    logo_path: string | undefined;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
}

type DateRange = {
  maximum: string;
  minimum: string;
};
