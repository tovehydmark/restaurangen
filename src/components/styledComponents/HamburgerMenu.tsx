import styled from "styled-components";

export const HamburgerDiv = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  z-index: 10;
  /* display: none; */
`;

export const Burger = styled.div`
  width: 2rem;
  height: 0.25 rem;
  border-radius: 10px;
  /* background-color: black; */
  border: 2px black solid; //La in denna istället för background color
  transform-origin: 1px;
  transition: all 0.3s linear;
  z-index: 100;
`;

export function HamburgerMenu() {
  return (
    <>
      <HamburgerDiv className="hamburger">
        <Burger className="burger burger1"></Burger>
        <Burger className="burger burger2"></Burger>
        <Burger className="burger burger3"></Burger>
      </HamburgerDiv>
    </>
  );
}
