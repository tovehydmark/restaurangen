import CrabwBG from "../images/CrabwBG.png"
import styled from "styled-components"

export const StyledHeading = styled.h1`
color: #CF1D15;
font-size: 8rem;
font-family: "Merriweather", serif;   
`
export const StyledH3tag = styled.h3`
color: #004F4A;
font-size: 3rem;
font-family: "Merriweather", serif;
`
export const StyledP = styled.p`
font-family: "Roboto", sans-serif;
font-size: 2rem;`

export function NotFound() {
  return <div>
    <h1>404</h1>
    <p>Something smells fishy</p>
    <img src={CrabwBG}></img>
    <p>The page you were looking for was not found</p>
  </div>;
}
