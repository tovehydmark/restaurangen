import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Hem</Link>
              <Link to="/Contact">Kontakt</Link>
              <Link to="/Booking">Boka bord</Link>
              <Link to="Menu">Meny</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer></footer>
    </>
  );
}
