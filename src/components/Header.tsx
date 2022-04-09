import { Link } from "react-router-dom";
import { HamburgerMenu } from "./styledComponents/HamburgerMenu";

export function Header() {
  return (
    <header>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/">The Codfather</Link>
            <Link to="/Contact">Kontakt</Link>
            <Link to="/Booking">Boka bord</Link>
            <Link to="Menu">Meny</Link>
          </li>
        </ul>
        <HamburgerMenu></HamburgerMenu>
      </nav>
    </header>
  );
}
