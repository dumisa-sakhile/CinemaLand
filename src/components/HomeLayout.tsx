import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import ParticlesComponent from "./ParticlesComponent";
import { Navigate } from "react-router-dom";
import AuthenticatedStatus from "./AuthenticatedStatus";

const HomeLayout = () => {
if (AuthenticatedStatus()) {
  return <Navigate to="/movie" />;;
}
  return (
    <div className="min-w-full min-h-screen text-[#F2F2F2] roboto-condensed-regular flex flex-col items-center justify-center rounded-lg gap-6">
      <Header />
      <Outlet />
      <Footer />
      <ParticlesComponent />
    </div>
  );
};

export default HomeLayout;
