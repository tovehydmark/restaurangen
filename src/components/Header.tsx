import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import "../style/style.scss";

//All styling for the navigation is in the header component as a state variable is used to toggle the hamburger-menu. Instead of having some styling in this component, and some in a css file, we made the choice to gather it all in one place for a better structure.

export function Header() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  function toggleHamburger() {
    setHamburgerOpen(!hamburgerOpen);
  }

  //STYLED COMPONENTS//
  //Styled Nav used for navigation. In mobile view, the Nav is not displayed, instead a hamburger menu is shown
  const Nav = styled.nav`
    width: 100%;
    height: 70px;

    @media (max-width: 1023px) {
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

      @media (min-width: 1024px) {
        display: none;
      }
    }
    //Active link shows underline, changed from Link to NavLink for boolean isActive
    .link-active {
      text-decoration: underline black solid 2px;
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

    //In mobile view, when clicking on hamburger menu, the navigation is displayed covering the whole screen
    @media (max-width: 1023px) {
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
          text-decoration: none;
        }
      }
    }

    @media (min-width: 1024px) {
      display: flex;
      flex-direction: row;
      a {
        margin-right: 30px;
      }
    }
  `;

  const HamburgerContainer = styled.div`
    display: none;
    @media (max-width: 1023px) {
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
    border: 2px black solid;
    /* transform-origin: 1px;
    transition: all 0.3s linear; */
    z-index: 100;
    /* .burger1 {
      transform: ${hamburgerOpen ? "rotate(45deg)" : "(rotate(0)"};
    }
    .burger2 {
      transform: ${hamburgerOpen ? "translateX(100%)" : "(translateX(0)"};
      opacity: ${hamburgerOpen ? 0 : 1};
    }
    .burger {
      transform: ${hamburgerOpen ? "rotate(-45deg)" : "(rotate(0)"};
    } */

    border: ${hamburgerOpen ? "2px red solid" : "2px black solid"};
    /* transform: ${!hamburgerOpen ? "rotate(45deg)" : "(rotate(0deg)"}; */
  `;

  return (
    <header>
      <Nav className="navigation">
        <Ul onClick={toggleHamburger}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "link-active" : "link")}
            >
              The Codfather
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/Contact"
              className={({ isActive }) => (isActive ? "link-active" : "link")}
            >
              Kontakt
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/Booking"
              className={({ isActive }) => (isActive ? "link-active" : "link")}
            >
              Boka bord
            </NavLink>
          </li>
          <li>
            <NavLink
              to="Menu"
              className={({ isActive }) => (isActive ? "link-active" : "link")}
            >
              Meny
            </NavLink>
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
