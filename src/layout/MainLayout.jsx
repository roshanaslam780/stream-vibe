import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Main from "@/layout/Main";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="w-full min-h-dvh grid grid-rows-[auto_1fr_auto] grid-cols-1">
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </div>
  );
};

export default MainLayout;
