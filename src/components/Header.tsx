import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { HamburgerMenu } from "./styledComponents/HamburgerMenu";

export const Nav = styled.nav`
  width: 100%;
  height: 70px;
`;

const HamburgerContainer = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: fixed;
    margin: 16px 0 0 8px;
    /* top: 0; //Lägger sig fortfarande till vänster, vet ej varför
    right: 0; */
    z-index: 10;
  }
`;

//Created all these styled components as I did not want to do anything in the css file like I accidently did before...

export function Header() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  function toggleHamburger() {
    setHamburgerOpen(!hamburgerOpen);
  }

  //Styled components bör inte ligga inuti en komponent såhär, får upp varningar. Lät den ligga för tillfället eftersom jag behövde toggle-funktionen för display och den hittades inte om jag la Ul utanför

  const Ul = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0;
    padding: 0 25px;
    display: ${hamburgerOpen ? "inline" : "none"};

    @media (max-width: 767px) {
      position: absolute;
      right: 0;
      z-index: 10;
      height: 100vh;
      width: 100%;
      margin-top: 70px;
      background-color: rgba(0, 79, 74, 0.9);
      font-size: 2rem;
      list-style: none;

      li {
        margin: 30px;
      }

      a {
        color: white;
        text-decoration: none;

        :hover {
          text-decoration: underline;
        }
      }
    }

    //La detta här för att nav ska synas även när man breddar skärmen oavsett om hamburgerOpen är true eller false
    @media (min-width: 768px) {
      display: ${hamburgerOpen ? "inline" : "inline"};
    }
  `;
  return (
    <header>
      <Nav className="navigation">
        <Ul onClick={toggleHamburger}>
          <li>
            {" "}
            <Link to="/">The Codfather</Link>
          </li>

          <li>
            <Link to="/Contact">Kontakt</Link>
          </li>

          <li>
            <Link to="/Booking">Boka bord</Link>
          </li>
          <li>
            <Link to="Menu">Meny</Link>
          </li>
        </Ul>
        <HamburgerContainer onClick={toggleHamburger}>
          <HamburgerMenu></HamburgerMenu>
        </HamburgerContainer>
      </Nav>
    </header>
  );
}
