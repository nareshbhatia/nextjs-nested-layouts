import * as React from 'react';
import type { Movie } from '@/models';

async function fetchMovie(id: String): Promise<Movie | undefined> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const resMovie = await fetch(`${API_URL}/movies/${id}`);
  return resMovie.json();
}

const baseStyles = 'px-8 py-4';

export interface MoviePageProps {
  params: { id: string };
}

export default function MoviePage({ params }: MoviePageProps) {
  const { id: movieId } = params;

  const movie = React.use(fetchMovie(movieId));

  if (!movie) {
    return <div className={baseStyles}>Error: Movie not found</div>;
  }

  const { name, releaseYear, ratingsSummary } = movie;

  return (
    <div className={baseStyles}>
      <p className="text-xl">{name}</p>
      <p>{releaseYear}</p>
      <p>Rating: {ratingsSummary.aggregateRating}</p>
    </div>
  );
}
