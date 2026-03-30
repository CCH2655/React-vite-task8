import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 當路徑變動時，強制滾動到最上方
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // 這個元件不渲染任何東西
};

export default ScrollToTop;