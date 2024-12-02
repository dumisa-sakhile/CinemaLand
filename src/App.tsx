import { injectSpeedInsights } from "@vercel/speed-insights";
import { inject } from "@vercel/analytics";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import MoviePageLayout from "./components/MoviePageLayout";
import MoviePopular from "./pages/MoviePopular";
import MovieGenre from "./pages/MovieGenre";
import MovieNowPlaying from "./pages/MovieNowPlaying";
import MovieTopRated from "./pages/MovieTopRated";
import MovieUpcoming from "./pages/MovieUpcoming";
import MovieSearch from "./pages/MovieSearch";
import MovieDiscover from "./pages/MovieDiscover";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner"; // Import Sonner
import MovieDetails from "./pages/MovieDetails";
import MovieDetailsReviews from "./pages/MovieDetailsReviews";
import MovieDetailsRecommendations from "./pages/MovieDetailsRecommendations";
import MovieDetailsCredits from "./pages/MovieDetailsCredits";
import MovieCategory from "./pages/MovieCategory";


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element : <Home/>
  },
      {
        path: "/movie",
        element: <MoviePageLayout />,
        children: [
          { index: true, element: <MovieDiscover /> },
          { path: "/movie/popular", element: <MoviePopular /> },
          { path: "/movie/genre-filters", element: <MovieGenre /> },
          { path: "/movie/now-playing", element: <MovieNowPlaying /> },
          { path: "/movie/top-rated", element: <MovieTopRated /> },
          { path: "/movie/upcoming", element: <MovieUpcoming /> },
          { path: "/movie/search", element: <MovieSearch /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/movie/:category/:categoryId",
            element: <MovieCategory />,
          },
          {
            path: "/movie/:movieId",
            element: <MovieDetails />,
            children: [
              {
                index: true,
                element: <MovieDetailsReviews />,
              },
              {
                path: "/movie/:movieId/recommendations",
                element: <MovieDetailsRecommendations />,
              },
              {
                path: "/movie/:movieId/credits",
                element: <MovieDetailsCredits />,
              }, // Catch-all for nested routes
            ],
          },
        ],
      },
  
  { path: "*", element: <NotFound /> },
]);

injectSpeedInsights();
inject();

export default function App() {
  return (
    <div className="min-w-full min-h-screen text-[#F2F2F2] roboto-condensed-regular scrollbar-hide flex flex-col items-center justify-center rounded-lg gap-6 ">
      <QueryClientProvider client={queryClient}>
        <Toaster richColors /> {/* Add the Toaster component here */}
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}
