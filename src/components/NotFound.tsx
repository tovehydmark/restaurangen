import CrabwBG from '../images/CrabwBG.png'

export function NotFound() {
  return <div>
    <h1>404</h1>
    <p>Something smells fishy</p>
    <img src={CrabwBG}></img>
    <p>The page you were looking for was not found</p>
  </div>;
}
