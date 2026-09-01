import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CursorFollower } from "../../components/CursorFollower";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { LegacyEffects } from "../../components/LegacyEffects";
import { Navbar } from "../../components/Navbar";
import { NotFound } from "../../components/NotFound";
import { getPathMapping } from "../../utils";
import "./App.css";

const App = () => {
  const pathMapping = getPathMapping();
  const location = useLocation();
  const currentPage = pathMapping[location.pathname];

  useEffect(() => {
    const title = currentPage?.title ?? "Page not found";
    document.title = `${title} | ${import.meta.env.VITE_TEAM_NAME} · iGEM ${import.meta.env.VITE_TEAM_YEAR}`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentPage, location.pathname]);

  // Deep links with a hash land on the anchored section after render;
  // navigations without a hash keep the scroll-to-top behavior above.
  useEffect(() => {
    if (!location.hash) {
      return;
    }
    const target = document.getElementById(location.hash.slice(1));
    target?.scrollIntoView({ behavior: "instant", block: "start" });
  }, [location.hash]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <CursorFollower />
      <LegacyEffects />
      <Navbar />
      <main id="main-content">
        <Routes>
          {Object.values(pathMapping).map(
            ({ path, title, lead, layout, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  layout === "immersive" ? (
                    <Component />
                  ) : (
                    <>
                      <Header title={title} lead={lead} />
                      <div className="page-shell">
                        <Component />
                      </div>
                    </>
                  )
                }
              />
            ),
          )}
          <Route
            path="*"
            element={
              <>
                <Header
                  title="Page not found"
                  lead="The requested route does not exist in this wiki."
                />
                <div className="page-shell">
                  <NotFound />
                </div>
              </>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
