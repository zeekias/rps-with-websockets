import styled from "styled-components";

export const RulesContent = styled.div`
  animation: slide-fwd-tl 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  min-width: 400px;
  width: 30%;
  height: 70%;
  padding:  30px;
  gap: 30px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  top: auto;
  right: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  visibility: visible;
  z-index: 99;
  h2 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 32px;
    color: hsl(229, 25%, 31%);
  }
  img {
    width: 80%;
  }
  button {
    border: 0px;
    padding: 10px;
    font-size: 42px;
    color: hsl(229, 25%, 31%);
    background-color: transparent;
    cursor: pointer;

    :hover{
      color: red;
    }
  }

  @media (max-width: 688px) {
    gap: 20px;
    position: fixed;
    top: auto;
    right: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    visibility: visible;
    img {
      width:65%;
    }
  }

  @keyframes slide-fwd-tl {
  0% {
            transform: translateZ(-160px) translateY(100px) translateX(260px);
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
            transform: translateZ(160px) translateY(0px) translateX(0px);
            box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
  }
}

`;
