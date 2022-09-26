import React, { useContext, useState } from "react";
import { uid } from "uid";
import Options from "../../components/options/Options";
import {Rules} from "../../components/rules/Rules";
import TitleAndScore from "../../components/title-and-score/TitleAndScore";
import { GameContext } from "../../context/gameContext";
import { Container, RulesContainer } from "./styles";

export default function Main() {
  const { createNewRoom } = useContext(GameContext);
  const pageId = uid();

  const [showRules, setShowRules] = useState(false);

  const handleShowRules = ()=>{
    setShowRules(!showRules);
  }

  return (
    <Container>
        {showRules ? <Rules handleShowRules={handleShowRules} /> : <></>}
        <TitleAndScore />
        <a href={`/play/${pageId}`} onClick={()=>createNewRoom(pageId)}>ONLINE GAME</a>
        <Options />
        <RulesContainer>
          <button onClick={()=>handleShowRules()}>RULES</button>
        </RulesContainer>
    </Container>
  );
}
