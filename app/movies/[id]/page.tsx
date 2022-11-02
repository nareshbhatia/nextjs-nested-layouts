import * as React from 'react';
import type { NextPage } from 'next';

async function getMovie(id: string) {
  const API_URL = process.env.API_URL;
  const resMovie = await fetch(`${API_URL}/top-10-movies/${id}`);
  // returns a promise that resolves to a movie in JSON format
  return resMovie.json();
}

// TODO: Replace props type from `any` to more specific
export default function Page({ params }: any) {
  const movie = React.use(getMovie(params.id));
  return (
    <div>
      <p className="text-xl">{movie.name}</p>
      <p>{movie.year}</p>
      <p>Rating: {movie.rating}</p>
    </div>
  );
}
