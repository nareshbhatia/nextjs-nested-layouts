# Next.js 13 Nested Layouts

![Screenshot](assets/screenshot.png)

This is a slightly modified version of the
[Nested Layouts demo](https://www.youtube.com/watch?v=6mQ3M1CUGnk) built in
Next.js Conf 2022.

Here are the changes:

1. Kept the main `movies` route as a server rendered component (RSC), but
   changed the nested `movies[id]` route to be a client component.
2. Changed the next configuration to do a
   [static export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports).
   This forces the dynamic route to be rendered on the client-side (CSR). This
   works perfectly well in the dev build, but results in a 404 on the prod
   build. This issue is being discussed in the next.js repo under
   [issue #48022](https://github.com/vercel/next.js/issues/48022).
3. Added a workaround for the above issue by adding a static route
   `movies-query-param`. This route uses a query parameter to fetch movies thus
   avoiding dynamic routes completely.

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
