import React from "react";
import { Header } from "../Component/CoomonComponent/PageCommonComponent/Header/Index";
import TopNavbar from "../Component/CoomonComponent/PageCommonComponent/Navbar/Index";
import DownNavbar from "../Component/CoomonComponent/PageCommonComponent/DownNavbar";
import Footer from "../Component/CoomonComponent/PageCommonComponent/Footer/Index";
import { Outlet } from "react-router-dom";

const Parent = () => {
  return (
    <>
      <Header />
      <TopNavbar />
      <DownNavbar />
      {/* child will in outlet */}
      <Outlet />
      {/* child will in outlet */}
      <Footer />
    </>
  );
};

export default React.memo(Parent);
