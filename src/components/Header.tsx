import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import "../style/style.scss";
import { HamburgerDiv } from "./styledComponents/HamburgerDiv";
import { UnorderedList } from "./styledComponents/Ul";

export function Header() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  function toggleHamburger() {
    setHamburgerOpen(!hamburgerOpen);
  }

  //STYLED COMPONENTS//
  //Styled Nav used for navigation. In mobile view, the Nav appear as a hamburger menu.
  const Nav = styled.nav`
    width: 100%;
    height: 70px;

    @media (max-width: 1289px) {
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

      @media (min-width: 1290px) {
        display: none;
      }
    }
    //Active link shows underline, changed from Link to NavLink for boolean isActive
    .link-active {
      text-decoration: underline black solid 2px;
    }
  `;

  //Kanske flytta denna styling också
  const HamburgerContainer = styled.div`
    display: none;
    @media (max-width: 1289px) {
      width: 40px;
      display: fixed;
      display: flex;
      flex-wrap: wrap;
      margin: 16px 0 0 8px;
      top: 0;
      right: 0;
      z-index: 10;
    }
  `;

  return (
    <header>
      <Nav className="navigation">
        <UnorderedList
          isOpen={hamburgerOpen}
          toggleHamburger={toggleHamburger}
        ></UnorderedList>
        <p>
          <NavLink className="mobileHomeLogo" to="/">
            The Codfather
          </NavLink>
        </p>
        <HamburgerContainer onClick={toggleHamburger}>
          <HamburgerDiv isOpen={hamburgerOpen}></HamburgerDiv>
        </HamburgerContainer>
      </Nav>
    </header>
  );
}
