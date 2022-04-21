import { Outlet } from "react-router-dom";
import { Header } from "./Header";
//import {FaFacebookSquare} from "react-icons/fa";
import "../style/style.scss";

export function Layout() {
  return (
    <div className="bodyContainer">
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <p className="footerPhone">+46 70 123 45 67</p>

        <p className="footerOpenHours">
          Öppettider:
          <br />
          Mån-Tors: 11.00 - 22.00
          <br />
          Fre-Sön: 11.00 - 23.00
        </p>
        <div>
          <a href="#" className="footerFacebook">
            Facebook
          </a>
          <a href="#" className="footerInstagram">
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
}
