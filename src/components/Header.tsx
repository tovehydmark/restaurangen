import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { HamburgerMenu } from "./styledComponents/HamburgerMenu";

export const Nav = styled.nav`
  width: 100%;
  height: 70px;
`;

export const Li = styled.li`
  list-style-type: none;
  padding-left: 10px;
`;

const HamburgerContainer = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: fixed;
    top: 0;
    right: 0;
    z-index: 10;
  }
`;

//Created all these styled components as I did not want to do anything in the css file like I accidently did before...

export function Header() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  function toggleHamburger() {
    setHamburgerOpen(!hamburgerOpen);
    console.log(hamburgerOpen);
  }

  //Styled components bör inte ligga inuti en komponent såhär, får upp varningar. Lät den ligga för tillfället eftersom jag behövde toggle-funktionen för display och den hittades inte om jag la Ul utanför

  const Ul = styled.ul`
    display: flex;
    flex-wrap: wrap;
    float: right;
    margin: 20px 0;
    padding: 0 25px;

    display: ${hamburgerOpen ? "inline" : "none"};

    @media (max-width: 767px) {
      background-color: lightblue;
      height: 100vh;
      z-index: 100;
      width: 70vw;
      /* margin-top: 50px; */
      position: absolute;
    }
  `;
  return (
    <header>
      <Nav className="navigation">
        <Ul>
          <Li>
            <Link to="/">The Codfather</Link>
            <Link to="/Contact">Kontakt</Link>
            <Link to="/Booking">Boka bord</Link>
            <Link to="Menu">Meny</Link>
          </Li>
        </Ul>
        <HamburgerContainer onClick={toggleHamburger}>
          <HamburgerMenu></HamburgerMenu>
        </HamburgerContainer>
      </Nav>
    </header>
  );
}
