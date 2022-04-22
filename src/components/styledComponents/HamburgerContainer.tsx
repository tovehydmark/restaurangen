import styled from "styled-components";

export const HamburgerContainer = styled.div`
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
