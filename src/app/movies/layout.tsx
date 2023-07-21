import * as React from 'react';
import Link from 'next/link';

async function getMovies() {
  const API_URL = process.env.API_URL;
  const resMovies = await fetch(`${API_URL}/top-10-movies`);
  // returns a promise that resolves to movies in JSON format
  return resMovies.json();
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function MoviesLayout({ children }: LayoutProps) {
  const movies = React.use(getMovies());
  return (
    <div className="flex">
      <ul className="pr-10 text-sm flex-none">
        {movies.map((movie: any) => (
          <li key={movie.name}>
            <Link href={`/movies/${movie.id}`}>{movie.name}</Link>
          </li>
        ))}
      </ul>
      <div>{children}</div>
    </div>
  );
}
