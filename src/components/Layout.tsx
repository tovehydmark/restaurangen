import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">The Codfather</Link>
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
      <footer>
      <p>
       Öppettider:
       <br />
       Mån-Tors: 11.00 - 22.00
        <br />
        Fre-Sön: 11.00 - 23.00
     </p>

     <a href="#">Facebook</a>
     <a href="#">Instagram</a>

      </footer>
    </>
  );
}
