import { useState, useEffect } from "react";
export function useScroll(show) {
  const [showMenu, setShowMenu] = useState(show);

  const controlNavbar = () => {
    if (window.scrollY > 0) {
      setShowMenu(!showMenu);
    } else {
      setShowMenu(showMenu);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);
  return showMenu;
}
