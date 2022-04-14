import { Link, Outlet } from "react-router-dom";
import { Header } from "./Header";
import "../style/style.scss";

export function Layout() {
  return (
    <>
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <p className="footerPhone">070 123 45 67</p>

        <p className="footerOpenHours">
          Öppettider:
          <br />
          Mån-Tors: 11.00 - 22.00
          <br />
          Fre-Sön: 11.00 - 23.00
        </p>

        <a href="#" className="footerFacebook">
          Facebook
        </a>
        <a href="#" className="footerInstagram">
          Instagram
        </a>
      </footer>
    </>
  );
}
