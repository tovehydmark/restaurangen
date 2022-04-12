import { Link, Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Layout() {
  return (
    <>
      <Header></Header>
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
