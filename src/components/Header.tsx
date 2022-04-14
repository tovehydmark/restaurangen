import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { HamburgerMenu } from "./styledComponents/HamburgerMenu";

const HamburgerContainer = styled.div`
  display: none;
  @media (max-width: 767px) {
    width: 40px;
    display: fixed;
    margin: 16px 0 0 8px;
    top: 0; //Lägger sig fortfarande till vänster, vet ej varför
    right: 0;
    z-index: 10;
  }
`;

export function Header() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  function toggleHamburger() {
    setHamburgerOpen(!hamburgerOpen);
  }

  const Nav = styled.nav`
    width: 100%;
    height: 70px;

    @media (max-width: 767px) {
      width: 40px;
      position: absolute;
      right: 10px;
      align-items: flex-end;
    }

    //Lägg denna till höger i mobilvy
    //När man klicakr på denna nu öppnas menyn
    p {
      display: ${!hamburgerOpen ? "inline" : "none"};
      margin: 0;
      position: fixed;
      left: 16px;
      font-size: 1.5rem;
      top: 17px;

      @media (min-width: 767px) {
        display: none;
      }
    }
  `;

  const Ul = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0;
    padding: 0 25px;

    display: ${hamburgerOpen ? "inline" : "none"};
    list-style: none;
    font-size: 1.5rem;

    a {
      color: white;
      text-decoration: none;

      :hover {
        text-decoration: underline;
      }
    }

    @media (max-width: 767px) {
      position: fixed;
      left: 0;
      top: -105px;
      padding-top: 120px;
      z-index: 10;
      height: 100vh;
      width: 100%;
      margin-top: 70px;
      background-color: rgba(0, 79, 74, 1);

      li {
        margin: 30px;
      }
    }

    //La detta här för att nav ska synas även när man breddar skärmen oavsett om hamburgerOpen är true eller false
    @media (min-width: 768px) {
      display: ${hamburgerOpen ? "flex" : "flex"};
      flex-direction: row;
      a {
        color: black; //Ändra detta när bg-color är satt i headern
        margin-right: 30px;
      }
    }
  `;
  return (
    <header>
      <Nav className="navigation">
        <Ul onClick={toggleHamburger}>
          <li>
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
        <p>The Codfather</p>
        <HamburgerContainer onClick={toggleHamburger}>
          <HamburgerMenu></HamburgerMenu>
        </HamburgerContainer>
      </Nav>
    </header>
  );
}
