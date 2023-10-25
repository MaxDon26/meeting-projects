import { useEffect, useState } from "react";
import "./App.css";
import {
  checkMistakes,
  complitedWord,
  keyIsExist,
  keyIsValid,
} from "./utils/validate";

import api from "./api";
import { getRandomNumber } from "./utils/randomNumber";

function App() {
  const [keys, setKeys] = useState([]);
  const [questionData, setQuestionData] = useState(api);
  const [currentQustionIdx, setCurrentQustionIdx] = useState(
    getRandomNumber(questionData.length)
  );

  const [tries, setTries] = useState(
    questionData[currentQustionIdx].answer.length + 2
  );

  const currentAnswer = questionData[currentQustionIdx].answer;
  const currentQustion = questionData[currentQustionIdx].question;
  const isComplete = complitedWord(currentAnswer, keys);

  const filterQuestion = (index) => {
    setQuestionData((prev) => prev.filter((el, ind) => ind !== index));
  };

  useEffect(() => {
    const randomIndex = getRandomNumber(questionData.length - 2);
    setCurrentQustionIdx(randomIndex);
  }, [questionData]);

  console.log(tries);

  useEffect(() => {
    setTries(currentAnswer.length + 2);
  }, [currentAnswer]);

  useEffect(() => {
    const clickKey = (e) => {
      if (!keyIsValid(e.key) || keyIsExist(e.key, keys) || tries === 0) return;

      if (!checkMistakes(currentAnswer, e.key)) {
        setTries((prev) => prev - 1);
      }
      setKeys((prev) => [...prev, e.key]);
    };

    document.addEventListener("keydown", clickKey);

    return () => document.removeEventListener("keydown", clickKey);
  }, [keys, tries]);

  const handleReset = () => {
    setKeys([]);

    if (questionData.length === 1) {
      setQuestionData(api);
      return;
    }
    filterQuestion(currentQustion);
  };

  return (
    <div className="container">
      <div className="app">
        <h1 className="title">Игра в слова</h1>
        <hr />

        <div className="word-container">
          {currentAnswer.split("").map((char, ind) => (
            <div
              key={char + ind}
              className={
                "word-letter " + (keyIsExist(char, keys) ? "done" : "")
              }
            >
              {keyIsExist(char, keys) ? char : null}
            </div>
          ))}
        </div>
        <div className="info">
          <p className="tries">Попытки: {tries}</p>
          <p className="mistakes">
            Ошибки:{" "}
            {keys
              .filter((key) => !checkMistakes(currentAnswer, key))
              .map((key, ind) => (
                <span className="mistake" key={key + ind}>
                  {key}
                </span>
              ))}
          </p>
          <p className="question">Вопрос: {currentQustion}</p>
        </div>
        <div className="btns">
          {" "}
          <button onClick={handleReset}>Поменять вопрос</button>
          {isComplete && <button onClick={handleReset}>Продолжить</button>}
          {tries === 0 && (
            <button onClick={handleReset}>Попробовать снова</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
