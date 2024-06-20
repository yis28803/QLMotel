import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./footer";

const PublicLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
