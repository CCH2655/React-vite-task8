import { Outlet, Link, ScrollRestoration } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

function FrontendLayout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header headerType={"admin"}/>
        <ScrollRestoration/>
        
        <main className="flex-grow bg-[#F5F2ED]">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  )
}

export default FrontendLayout;