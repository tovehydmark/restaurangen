import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//All styling for the navigation is in the header component as a state variable is used to toggle the hamburger-menu. Instead of having some styling in this component, and some in a css file, we made the choice to gather it all in one place for a better structure.

const HamburgerContainer = styled.div`
  display: none;
  @media (max-width: 767px) {
    width: 40px;
    display: fixed;
    margin: 16px 0 0 8px;
    top: 0;
    right: 0;
    z-index: 10;
  }
`;

const HamburgerDiv = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  z-index: 10;
`;

const Burger = styled.div`
  width: 2rem;
  height: 0.25 rem;
  border-radius: 10px;
  background-color: black;
  border: 2px black solid; //La in denna istället för background color - why tho
  transform-origin: 1px;
  transition: all 0.3s linear;
  z-index: 100;
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
      color: black;
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
      cursor: pointer;

      li {
        margin: 30px;
        a {
          color: white;
        }
      }
    }

    @media (min-width: 768px) {
      display: flex;
      flex-direction: row;
      a {
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
          <HamburgerDiv className="hamburger">
            <Burger className="burger burger1"></Burger>
            <Burger className="burger burger2"></Burger>
            <Burger className="burger burger3"></Burger>
          </HamburgerDiv>
        </HamburgerContainer>
      </Nav>
    </header>
  );
}

//Kvar att fixa för evot: animera kryss
//Navlink
