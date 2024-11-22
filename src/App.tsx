import { injectSpeedInsights } from "@vercel/speed-insights";
import HomeLayout from "./components/HomeLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Reset from "./pages/auth/Reset";
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

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Signin /> },
      { path: "/signup", element: <Signup /> },
      { path: "/reset-password", element: <Reset /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
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
    ],
  },
  { path: "*", element: <NotFound /> },
]);

injectSpeedInsights();

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
