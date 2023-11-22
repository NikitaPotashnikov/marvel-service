import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

  const [selectedChar, setSelectedChar] = useState(null);

  const updateSelectedChar = (id) => {
    setSelectedChar(id);
  }

  return (
    <>
      <RandomChar />
      <div className="char__content">
        <CharList onCharSelected={updateSelectedChar} />
        <CharInfo charId={selectedChar} />
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  )
}

export default MainPage;