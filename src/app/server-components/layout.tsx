import * as React from 'react';
import Link from 'next/link';
import type { MoviePagination, QueryParams } from '@/models';
import { queryParamsToSearchParams, SortParam } from '@/models';

async function fetchMovies(queryParams: QueryParams) {
  const API_URL = process.env.API_URL;
  const searchParamsString = queryParamsToSearchParams(queryParams);
  const resMovies = await fetch(`${API_URL}/movies?${searchParamsString}`, {
    // See https://nextjs.org/docs/app/building-your-application/caching#data-cache
    // Don't store the results in Data Cache, always fetch from the data source.
    // In spite of this, you will see that sometimes data is NOT fetched from the data source.
    // That's because the entire page is cached in the client's Router Cache for 30 seconds.
    // See https://nextjs.org/docs/app/building-your-application/caching#router-cache
    // To prevent caching in the Router Cache you must disable it in next.config.js.
    // See https://nextjs.org/docs/app/api-reference/next-config-js/staleTimes
    cache: 'no-store',
  });
  return resMovies.json();
}

const baseStyles = 'container relative mx-auto max-w-screen-xl px-8 py-4';

interface LayoutProps {
  children: React.ReactNode;
}

export default function ServerComponentsLayout({ children }: LayoutProps) {
  const top10QueryParams: QueryParams = {
    sort: SortParam.RANK_ASC,
    pageSpec: {
      page: 1,
      perPage: 10,
    },
  };

  // query for top 10 movies
  const data = React.use(fetchMovies(top10QueryParams));

  return (
    <div className="flex flex-1 min-h-0 p-4">
      <ul className="pr-10 text-sm flex-none overflow-auto">
        {data.movies.map((movie: any) => (
          <li key={movie.name}>
            <Link href={`/server-components/${movie.id}`} prefetch={false}>
              {movie.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="px-2">{children}</div>
    </div>
  );
}
