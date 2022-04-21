import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaPhoneSquareAlt,
} from "react-icons/fa";
import "../style/style.scss";

export function Layout() {
  return (
    <div className="bodyContainer">
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <p className="footerPhone">
          <FaPhoneSquareAlt color="black" size={20} /> +46 70 123 45 67
        </p>

        <p className="footerOpenHours">
          Öppettider:
          <br />
          Mån-Tors: 11.00 - 22.00
          <br />
          Fre-Sön: 11.00 - 23.00
        </p>
        <div>
          <a href="https://youtu.be/dQw4w9WgXcQ" className="footerFacebook">
            <FaFacebookSquare color="black" size={40} />
          </a>
          <a href="https://youtu.be/dQw4w9WgXcQ" className="footerInstagram">
            <FaInstagramSquare color="black" size={40} />
          </a>
        </div>
      </footer>
    </div>
  );
}
