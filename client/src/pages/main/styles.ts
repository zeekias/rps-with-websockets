import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: radial-gradient(hsl(214, 47%, 23%), hsl(237, 49%, 15%));
  gap: 30px;
  position: relative;

  @media (max-width: 688px) {
    max-width: 100vw;
    height: 100vh;
    max-height: 100%;
  }
`;

export const RulesContainer = styled.div`
  position: absolute;
  right: 10%;
  bottom: 5%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  button {
    font-size: 32px;
    padding: 5px;
    border-radius: 8px;
    background-color: transparent;
    cursor: pointer;
  }
  @media (max-width: 688px) {
    display: none;
  }
`;
