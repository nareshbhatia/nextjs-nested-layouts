'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Movie {
  id: string;
  name: string;
  year: number;
  rating: number;
}

function useMovies() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const failMessage = 'Failed to get movies';

  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [error, setError] = React.useState<Error>();
  const [movies, setMovies] = React.useState<Movie[]>([]);

  React.useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${apiUrl}/top-10-movies`);

        if (!response.ok) {
          setIsError(true);
          setError(new Error(`${failMessage} (${response.status})`));
          setIsLoading(false);
          return;
        }

        const movies: Movie[] = await response.json();
        setMovies(movies);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setError(error instanceof Error ? error : new Error(failMessage));
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [apiUrl]);
  return { isLoading, isError, error, movies };
}

function useMovie(movieId: string | null) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const failMessage = 'Failed to get movie';

  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [error, setError] = React.useState<Error>();
  const [movie, setMovie] = React.useState<Movie | undefined>();

  React.useEffect(() => {
    const fetchMovie = async () => {
      if (movieId === null) {
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`${apiUrl}/top-10-movies/${movieId}`);

        if (!response.ok) {
          setIsError(true);
          setError(new Error(`${failMessage} (${response.status})`));
          setIsLoading(false);
          return;
        }

        const movie: Movie = await response.json();
        setMovie(movie);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setError(error instanceof Error ? error : new Error(failMessage));
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [apiUrl, movieId]);
  return { isLoading, isError, error, movie };
}

export default function MoviesQueryParamPage() {
  console.log('MoviesQueryParamPage render');
  React.useEffect(() => {
    console.log('MoviesQueryParamPage mounted');
    return () => {
      console.log('MoviesQueryParamPage unmounted');
    };
  }, []);

  const searchParams = useSearchParams();
  const movieId = searchParams.get('id');
  const { movies } = useMovies();
  const { movie } = useMovie(movieId);

  return (
    <div className="flex">
      <ul className="pr-10 text-sm flex-none">
        {movies.map((movie: any) => (
          <li key={movie.name}>
            <Link href={`/movies-query-param?id=${movie.id}`}>
              {movie.name}
            </Link>
          </li>
        ))}
      </ul>

      {movieId === null && <div>Select a movie</div>}

      {movieId !== null && movie === undefined && <div>Loading...</div>}

      {movieId !== null && movie !== undefined && (
        <div>
          <p className="text-xl">{movie.name}</p>
          <p>{movie.year}</p>
          <p>Rating: {movie.rating}</p>
        </div>
      )}
    </div>
  );
}
