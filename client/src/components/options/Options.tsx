import React, { useContext, useEffect, useState} from "react";
import { GameContext, GameContextProvider } from "../../context/gameContext";
import {Result} from "../result/Result";
import { Option, OptionsContainer } from "./styles";

export default function Options() {
  const { gameOptions, handleUserOption, user, playAgain } = useContext(GameContext);
  const [show, setShow] = useState(true);

  function handleShow (option: number){
    setShow(!show);
    if(option === 8) return;
    if(option === 9) {
      playAgain();
      return;
    };
    handleUserOption(option);
  }

  function handleWaitOption(){
    const userIndex = gameOptions.findIndex(option=> option.userOption.id === user.optionPicked.id );
    const titleText = userIndex > -1 ? "YOU PICKED" : "CLICK TO USE AGAIN"
    return (
      <OptionsContainer width="450px">
        <div className={`user-option`}>
        <h2>{titleText}</h2>
          <Option color={user.optionPicked.localColor} size={"250px"} onClick={()=>{
            
            userIndex < 0 ? handleUserOption(user.optionPicked.id): ""}}>
            <img src={user.optionPicked.imgSrc} alt="Option Choosed" />
          </Option>
        </div>

        <div className="game-result">
                  <button onClick={()=>handleShow(8)}>
                    <span> CHANGE OPTION </span>
                  </button>
        </div>

        <div className={`house-option`}>
          <h2>YOUR OPPONENT</h2>
          <Option color={"white"} size={"250px"}>
            <img src={"/images/loading.svg"} alt="Option Choosed" />
          </Option>
        </div>
        </OptionsContainer>
    )
  }


  return (
    <>
      {gameOptions.length < 2 ? (
       <>
       { show  ? (
          <OptionsContainer width="450px">
          <div className="options">
            <Option
              color="hsl(230, 89%, 62%)"
              size="150px"
              onClick={() => handleShow(1)}
            >
              <img src="/images/icon-paper.svg" alt="Paper" />
            </Option>
            <Option
              color="hsl(39, 89%, 49%)"
              size="150px"
              onClick={() => handleShow(2)}
            >
              <img src="/images/icon-scissors.svg" alt="Scissors" />
            </Option>
            <Option
              color="hsl(349, 71%, 52%)"
              size="150px"
              onClick={() => handleShow(3)}
            >
              <img src="/images/icon-rock.svg" alt="Rock" />
            </Option>
          </div>
        </OptionsContainer>) : handleWaitOption()
       }
        </>
      ) : (
        <Result handleShow={handleShow} />
      )}
    </>
  );
}
