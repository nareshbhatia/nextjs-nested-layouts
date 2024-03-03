import * as React from 'react';

async function getMovie(movieId: string) {
  const API_URL = process.env.API_URL;
  const resMovie = await fetch(`${API_URL}/top-10-movies/${movieId}`);
  // returns a promise that resolves to movies in JSON format
  return resMovie.json();
}

export interface MoviePageProps {
  params: { id: string };
}

export default function MoviePage({ params }: MoviePageProps) {
  const movie = React.use(getMovie(params.id));

  return movie !== undefined ? (
    <div>
      <p className="text-xl">{movie.name}</p>
      <p>{movie.year}</p>
      <p>Rating: {movie.rating}</p>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
