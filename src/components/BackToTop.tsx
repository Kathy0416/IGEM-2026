import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 480);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  const goToTop = () => {
    document.getElementById("main-content")?.focus({ preventScroll: true });
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`back-to-top${visible ? " is-visible" : ""}`}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={goToTop}
    >
      <img src={`${import.meta.env.BASE_URL}jellyfish-top.png`} alt="" aria-hidden="true" />
    </button>
  );
}
