import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { uid } from "uid";
const myId = uid();
localStorage.setItem("USER_ID", myId);

const socket = io("http://localhost:8080");
  socket.on("connect", () => console.log("[IO] Connect => A new connection has been established"));

interface iUser {
  optionPicked: { localColor: string; imgSrc: string; id: number };
}

interface iOption{
  id: string,
  userOption: { localColor: string; imgSrc: string; id: number }
}
interface iResult {
  winner: number;
  info: string;
}
interface IGameContext {
  myId: string;
  user: iUser;
  house: iUser;
  result: iResult;
  score: number;
  gameOptions: iOption[];
  handleUserOption: (optionPickedByUser: number) => void;
  verifyWinner: (gameOptions: iOption[]) => void;
  handleHouseOption: () => void;
  playAgain: ()=>void;
  createNewRoom: (pageId: string)=>void;
}

const initialValue = {
  myId: myId,
  user: { optionPicked: { localColor: "", imgSrc: "", id: -1 } },
  house: { optionPicked: { localColor: "", imgSrc: "", id: 0 } },
  score: 0,
  result: {
    winner: -1,
    info: "",
  },
  gameOptions: [],
  handleUserOption: () => {},
  verifyWinner: () => {},
  handleHouseOption: () => {},
  playAgain: ()=>{},
  createNewRoom: (pageId: string)=>{}
};

interface IProps {
  children: React.ReactNode;
}

export const GameContext = createContext<IGameContext>(initialValue);

export const GameContextProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<iUser>({
    optionPicked: { localColor: "", imgSrc: "", id: -1 },
  });
  const [house, setHouse] = useState<iUser>({
    optionPicked: { localColor: "", imgSrc: "", id: 0 },
  });
  const [result, setResult] = useState<iResult>({ winner: 0, info: "" });
  const [score, setScore] = useState(0);
  const [gameOptions, setGameOptions] = useState<iOption[]>([]);

  const handleUserOption = (optionPickedByUser: number) => {
    const userId = localStorage.getItem("USER_ID");
    const gameUrl = window.location.href.split("/");
    const userOption = { localColor: "", imgSrc: "", id: optionPickedByUser };
    switch (optionPickedByUser) {
      case 1:
        userOption.localColor = "hsl(230, 89%, 62%)";
        userOption.imgSrc = "/images/icon-paper.svg";
        break;
      case 2:
        userOption.localColor = "hsl(39, 89%, 49%)";
        userOption.imgSrc = "/images/icon-scissors.svg";
        break;
      case 3:
        userOption.localColor = "hsl(349, 71%, 52%)";
        userOption.imgSrc = "/images/icon-rock.svg";
        break;
      default:
        userOption.localColor = "";
        userOption.imgSrc = "";
    }
    setUser({ optionPicked: userOption });
    if(gameUrl.length>4){
      socket.emit("option.choosed", { id: myId, userOption, connectionId: gameUrl[gameUrl.length-1] });
      return;
    }
    const houseOption = handleHouseOption();
    setGameOptions([{id:myId, userOption}, {id:uid(), userOption: houseOption}]);
  };

  function createNewRoom(pageId: string){
    socket.emit("create.room", {roomId: pageId, roomInfo: []});
  }

  const handleHouseOption = () => {
    const randomOption = Math.floor(Math.random() * 3 + 1);
    const userOption = { localColor: "", imgSrc: "", id: randomOption };
    switch (randomOption) {
      case 1:
        userOption.localColor = "hsl(230, 89%, 62%)";
        userOption.imgSrc = "/images/icon-paper.svg";
        break;
      case 2:
        userOption.localColor = "hsl(39, 89%, 49%)";
        userOption.imgSrc = "/images/icon-scissors.svg";
        break;
      case 3:
        userOption.localColor = "hsl(349, 71%, 52%)";
        userOption.imgSrc = "/images/icon-rock.svg";
        break;
    }
    setHouse({ optionPicked: userOption });
    return userOption;
  };

  function playAgain(){
    const gameUrl = window.location.href.split("/");
    setGameOptions([]);
    socket.emit(`play.again`, {connectionId: gameUrl[gameUrl.length-1]} );
  }

  function verifyWinner(gameOptions: iOption[]) {
    const userIndex = gameOptions.findIndex((option)=>option.id===myId);
    const houseIndex = gameOptions.findIndex((option)=>option.id!==myId);
    const userOption = gameOptions[userIndex].userOption.id;
    const houseOption = gameOptions[houseIndex].userOption.id;;
    if (userOption === -1) return;
    if (userOption === houseOption) {
      setResult({ winner: 0, info: "TIE" });
      return;
    }
    if (userOption === 1 && houseOption === 2) {
      setResult({ winner: 2, info: "YOU LOSE" });
      setScore(0);
      return;
    }
    if (userOption === 2 && houseOption === 3) {
      setResult({ winner: 2, info: "YOU LOSE" });
      setScore(0);
      return;
    }
    if (userOption === 3 && houseOption === 1) {
      setResult({ winner: 2, info: "YOU LOSE" });
      setScore(0);
      return;
    }

    setResult({ winner: 1, info: "YOU WIN" });
    setScore(score + 1);
    return;
  }
  useEffect(() => {
      const gameUrl = window.location.href.split("/");
      const handleNewOption = (newOption: iOption[]) => {
          setGameOptions([...newOption]);
      };
      socket.on(`${gameUrl[gameUrl.length-1]}`, handleNewOption);
      socket.on(`reset.${gameUrl[gameUrl.length-1]}`, handleNewOption);
      return () => {
        socket.off(`${gameUrl[gameUrl.length-1]}`, handleNewOption);
        socket.off(`reset.${gameUrl[gameUrl.length-1]}`, handleNewOption);
      }
      
  }, [user, gameOptions]);
  return (
    <GameContext.Provider
      value={{
        myId,
        user,
        handleUserOption,
        house,
        handleHouseOption,
        result,
        verifyWinner,
        score,
        gameOptions,
        playAgain,
        createNewRoom
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
