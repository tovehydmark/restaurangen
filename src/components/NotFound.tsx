import CrabwBG from "../images/CrabwBG.png";

export function NotFound() {
  return (
    <div className="notfoundContainer">
      <h1>404</h1>
      <h3>Something smells fishy</h3>
      <img className="crabImg" src={CrabwBG}></img>
      <p>The page you were looking for was not found</p>
    </div>
  );
}
