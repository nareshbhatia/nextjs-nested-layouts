# Next.js Nested Layouts Using App Router

![Screenshot](assets/screenshot.png)

Live demo: https://nextjs-nested-layouts-ruby.vercel.app/

This is a slightly modified version of the
[Nested Layouts demo](https://www.youtube.com/watch?v=6mQ3M1CUGnk) built in
Next.js Conf 2022.

Here are the changes:

1. Kept the main `movies` route as a server rendered component (RSC), but
   changed the nested `movies[id]` route to be a client component.
2. Added a workaround for
   [issue #48022](https://github.com/vercel/next.js/issues/48022) whereby
   dynamic routes are not supported when next.js is configured for
   [static export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports).
   While this app is not configured for static export, I added a static route
   `movies-query-param` to show how something equivalent can be supported using
   query parameters, avoiding dynamic routes completely.

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
