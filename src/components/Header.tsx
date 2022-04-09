import { Link } from "react-router-dom";

export function Header() {
  return (
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
  );
}
