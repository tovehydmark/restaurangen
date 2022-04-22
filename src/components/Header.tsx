import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../style/style.scss";
import { Hamburger } from "./Hamburger";
import { HamburgerContainer } from "./styledComponents/HamburgerContainer";
import { UnorderedList } from "./styledComponents/UnorderedList";

//Boolean hamburgerOpen is used to toggle hamburger menu on click

export function Header() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  function toggleHamburger() {
    setHamburgerOpen(!hamburgerOpen);
  }

  return (
    <header>
      <nav className="navigation">
        <UnorderedList
          isOpen={hamburgerOpen}
          toggleHamburger={toggleHamburger}
        ></UnorderedList>

        <p className={`${hamburgerOpen ? "hide" : "show"}`}>
          <NavLink className="mobileHomeLogo" to="/">
            The Codfather
          </NavLink>
        </p>

        <HamburgerContainer onClick={toggleHamburger}>
          <Hamburger isOpen={hamburgerOpen}></Hamburger>
        </HamburgerContainer>
      </nav>
    </header>
  );
}
