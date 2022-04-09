import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { HamburgerMenu } from "./styledComponents/HamburgerMenu";

export const Nav = styled.nav`
  width: 100%;
  height: 70px;
`;

export const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  float: left;
  margin: 20px 0;
  padding: 0 25px;
`;

export const Li = styled.li`
  list-style-type: none;
  padding-left: 10px;
`;

//Created all these styled components as I did not want to do anything in the css file like I accidently did before...
export const HamburgerContainer = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: fixed;
    padding-top: 1rem;
    margin-right: 1rem;
    z-index: 10;
  }
`;

export function Header() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  function toggleHamburger() {
    setHamburgerOpen(!hamburgerOpen);
    console.log(hamburgerOpen);
  }
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
