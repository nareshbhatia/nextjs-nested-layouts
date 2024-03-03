# Next.js Nested Layouts Using App Router

![Screenshot](assets/screenshot.png)

Live demo: https://nextjs-nested-layouts-ruby.vercel.app/

This is a slightly modified version of the
[Nested Layouts demo](https://www.youtube.com/watch?v=6mQ3M1CUGnk) built in
Next.js Conf 2022.

Here are the changes:

1. Renamed the main `movies` route to `movies-server-components`. This route
   renders using React Server Components (RSC). It has a nested dynamic route to
   show the selected movie.
2. Added a new route called `movies-client-components`. This route renders using
   React Client Components. It has a nested dynamic route to show the selected
   movie.
3. Added a new route called `movies-query-param`. This is a **static** route
   that uses query parameters to render the selected movie on the RHS. It is a
   workaround for [issue #48022](https://github.com/vercel/next.js/issues/48022)
   whereby dynamic routes are not supported when next.js is configured for
   [static export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports).
   While this app is not configured for static export, I added this route to
   show the workaround using query parameters, avoiding dynamic routes
   completely.

## Development Build

```shell
npm ci
npm run dev
```

Now point your browser to http://localhost:3000

## Production Build

```shell
npm ci
npm run build
npx serve@latest out
```
