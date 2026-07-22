import { stringToSlug } from "../utils";

export function Footer() {
  const teamYear = import.meta.env.VITE_TEAM_YEAR;
  const teamName = import.meta.env.VITE_TEAM_NAME;
  const teamSlug = stringToSlug(teamName);

  return (
    <footer className="pt-5 pb-5 footer py-5 mt-5 bg-dark text-white">
      <div className="container">
        <div className="row mb-4">
          <div className="col-lg-6 col-xs-12">
            <h4 className="mb-3">Heading</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
              ante mollis quam tristique convallis
            </p>
          </div>
          <div className="col-lg-3 col-xs-12">
            <h4 className="mt-lg-0 mt-sm-3">Links</h4>
            <ul className="m-2 p-2">
              <li>
                <a href="#">Lorem ipsum</a>
              </li>
              <li>
                <a href="#">Nam mauris velit</a>
              </li>
              <li>
                <a href="#">Etiam vitae mauris</a>
              </li>
              <li>
                <a href="#">Fusce scelerisque</a>
              </li>
              <li>
                <a href="#">Sed faucibus</a>
              </li>
              <li>
                <a href="#">Mauris efficitur nulla</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-xs-12">
            <h4 className="mt-lg-0 mt-sm-4 mb-3">Contact</h4>
            <p>22, Lorem ipsum dolor, consectetur adipiscing</p>
            <p className="mb-0">(541) 754-3010</p>
            <p>info@hsdf.com</p>
          </div>
        </div>
        <hr />
        {/* The following MUST be on every page: license information and link to the repository on gitlab.igem.org */}
        <div className="row mt-4">
          <div className="col">
            <p className="mb-0">
              <small>
                © {teamYear} - Content on this site is licensed under a{" "}
                <a
                  className="subfoot"
                  href="https://creativecommons.org/licenses/by/4.0/"
                  rel="license"
                >
                  Creative Commons Attribution 4.0 International license
                </a>
                .
              </small>
            </p>
            <p>
              <small>
                The repository used to create this website is available at{" "}
                <a href={`https://gitlab.igem.org/${teamYear}/${teamSlug}`}>
                  gitlab.igem.org/{teamYear}/{teamSlug}
                </a>
                .
              </small>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
