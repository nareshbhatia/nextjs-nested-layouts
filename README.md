# Next.js Nested Layouts

Live demo: https://nextjs-nested-layouts-ruby.vercel.app/

I created this repo to understand a performance issue when using only React
Client Components on a page (+ App Router). It's a list-detail page. When I
click on different items in the list, the client hits the Next.js server for an
RSC Payload on every click. I don't understand why.

I would have assumed that all code for that page should be on the client after
the first render, and from then on, the client would not have to load anything
from the server. Can anyone help me understand this behavior and a potential
workaround?

Please see details below.

## My Use Case

1. Application data is changing frequently – data freshness is important. So
   data caching should be disabled.
2. Data is obtained from an external service that exposes a REST or GraphQL API.
3. FCP, TTI are not important (not a marketing or shopping site).
4. Responsiveness to user interactions is most important - as the user clicks on
   items in the list, we want to show the LATEST detail as soon as possible –
   the application should not feel sluggish.
5. Application is to be used in the field. Assume a Fast 3G connection at best.

Here's a screenshot of my POC – a movie list on the left and the selected
movie's detail on the right. Granted this is not fast changing data, but it will
do for the POC :smiley:

![Screenshot](assets/screenshot.png)

## Implementation Details

I have implemented the requirements 4 ways to compare the performance:

1. **Server Components**: The entire page is built using React Server
   Components. Both list and detail data are fetched on the server.
2. **Client Components**: The entire page is built using React Client
   Components. Both list and detail data are fetched on the client. This is the
   preferred option give the requirements.
3. **Fake Child**: A variation of option 2, to improve performance (not
   successful). Here we are faking the nested child component by returning
   `undefined` (see [here](./src/app/fake-child/%5Bid%5D/page.tsx#L6)). This
   allows us to maintain the URL structure as `/movies/id`, but serve the detail
   as a hard-coded child (see [here](./src/app/fake-child/layout.tsx#L70)).
4. **Query Params**: Abandon the nested layout approach. Use a query parameter
   to get the detail. This approach also did not improve the performance.

Also, to meet the requirements, I have done the following:

1. Server-side fetches use the `no-store` option – see
   [here](./src/app/server-components/layout.tsx#L17).
2. Router Cache has been disabled - see [here](./next.config.js#L5-L9).

## Steps to Reproduce

Given that Client Components is my preferred option (option 2), let's first
demonstrate the issue.

1. Point your browser to the
   [live demo](https://nextjs-nested-layouts-ruby.vercel.app/), which is the
   production build.
2. Open the Chrome Dev Tools (right click > `Inspect`).
3. Click on the `Network` tab.
4. Change network speed to Fast 3G.
5. In the application, click on the `Client Components` tab. The movie list
   appears on the left. The initial display may be slow because the API server
   may be cold starting, however subsequent loads should be fast.
6. Now start clicking on different movies in the movie list. You will see a
   loading indicator and then the movie detail appearing after ~1200 ms. This is
   the interaction that I am trying to speed up.

## Analysis

Again, this analysis is focused on the Client Components option (option 2).

1. The parent layout is marked as a client component using `'use client'` – see
   [here](./src/app/client-components/layout.tsx#L1).
2. The nested child is also marked as a client component using `'use client'` –
   see [here](./src/app/client-components/%5Bid%5D/page.tsx#L1).

In spite of this entire page consisting of client components only, the browser
is making two network calls on each movie click. Looking at the calls for the
2nd click:

1. `GET /movies/tt0071562?\_rsc=101fc`: Call to the Next.js server to get the
   RSC Payload. This is because of a route change from `/movies/tt0468569` to
   `/movies/tt0071562`. The client wants to render only the route segment that
   has changed (see
   [partial rerendering](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#4-partial-rendering)),
   i.e. the movie detail. Hence it is asking for the RSC Payload for the `[id]`
   segment from the server (see
   [code splitting](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#1-code-splitting)).
2. `GET {{API_URL}}/movies/tt0071562`: Call to the external API to get the movie
   data

See the Chrome Dev Tools snapshot below for clarity:

![Network Calls](assets/network-calls.png)

I can understand if the RSC Payload is requested just the first time a movie is
clicked. However, for subsequent clicks, we shouldn't have to download the RSC
payload again because we are rendering the same client component repeatedly
(just with different data). We are wasting 572 ms per click!

I would love to get (1) an explanation of why this behavior is happening and (2)
a workaround where all we see is one call to the API server for each click.

This is hampering my ability to deliver a responsive user interface for this use
case with Next + RSC. This would be a no-brainer to implement as a traditional
React SPA.

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
npm start
```
