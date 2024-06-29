export interface Image {
  url: string;
  width: number;
  height: number;
}

export type Certificate = 'G' | 'NR' | 'PG-13' | 'PG' | 'R';

export interface RatingsSummary {
  aggregateRating: number;
  voteCount: number;
}

/**
 * Definition of a movie as implemented in Movie Magic
 */
export interface Movie {
  id: string;
  name: string;
  description: string;
  cast: string[];
  certificate: Certificate;
  genres: string[];
  image: Image;
  rank: number;
  ratingsSummary: RatingsSummary;
  releaseYear: number;
  runtime: number;
  tagline?: string;
  isFeatured: boolean;
}
