import React from "react";
import { RulesContent } from "./styles";

interface iProps{
  handleShowRules: ()=>void
}

export const Rules: React.FC<iProps> = ({handleShowRules})=> {
  return (
    <RulesContent>
      <h2>RULES <button onClick={()=>handleShowRules()}>X</button></h2>
      <img src="/images/image-rules-bonus.svg" alt="Rules" />
    </RulesContent>
  );
}
