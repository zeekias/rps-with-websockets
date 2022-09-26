import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../context/gameContext";
import { OptionsContainer, Option } from "../options/styles";

interface iProps{
  handleShow: (option: number)=>void
}

export const Result: React.FC<iProps> = ({handleShow})=>{
  const {myId, result, gameOptions, verifyWinner } = useContext(GameContext);

  const userIndex = gameOptions.findIndex((option)=>option.id===myId);
  const houseIndex = gameOptions.findIndex((option)=>option.id!==myId);

  const size = "250px";
  useEffect(() => { 
    verifyWinner(gameOptions);
  }, []);

  return (
    <OptionsContainer width="100%">
      {gameOptions.length > 1 ? (
        <>
        <div className={`user-option ${result.winner === 1 && "winner"}`}>
          <h2>YOU PICKED</h2>
          <Option color={gameOptions[userIndex].userOption.localColor} size={size}>
            <img src={gameOptions[userIndex].userOption.imgSrc} alt="Option Choosed" />
          </Option>
        </div>
        
        <div className="game-result">
                  <h2>{result.info}</h2>
                  <button onClick={()=>handleShow(9)}>
                    <span> PLAY AGAIN </span>
                  </button>
        </div>

        <div className={`house-option ${result.winner === 2 && "winner"}`}>
          <h2>OPPONENT PICKED</h2>
          <Option color={gameOptions[houseIndex].userOption.localColor} size={size}>
            <img src={gameOptions[houseIndex].userOption.imgSrc} alt="Option Choosed" />
          </Option>
        </div>
          
        </>
      ) : (
        <></>
      )}
    </OptionsContainer>
  );
}
