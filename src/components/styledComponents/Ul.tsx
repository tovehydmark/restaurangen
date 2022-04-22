import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface IUnorderedList {
  isOpen: boolean;
  toggleHamburger(): void;
}

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
  padding: 0 25px;
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
  @media (max-width: 1289px) {
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

  @media (min-width: 1290px) {
    display: flex;
    flex-direction: row;
    a {
      margin-right: 30px;
    }
  }
`;

export function UnorderedList(props: IUnorderedList) {
  return (
    <>
      <Ul
        onClick={props.toggleHamburger}
        className={`${props.isOpen ? "show" : "hide"}`}
      >
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
    </>
  );
}
