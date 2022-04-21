// import styled from "styled-components";

import { useState } from "react";

// const Hamburger = styled.div`
//   width: 2rem;
//   height: 2rem;
//   display: flex;
//   justify-content: space-around;
//   flex-flow: column nowrap;
//   z-index: 10;
// `;

interface IHamburgerProps {
  isOpen: boolean;
}

export function HamburgerDiv(props: IHamburgerProps) {
  // const [isOpen, setIsOpen]=useState(false)
  return (
    <>
      <div className="burger1"></div>
      <div className="burger2"></div>
      <div className="burger3"></div>
    </>
  );
}
