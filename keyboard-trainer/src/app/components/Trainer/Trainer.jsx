import { useState } from "react";
import { TextAreaField, Button } from "../common";
import style from "./style.module.css";

export const Trainer = () => {
  const [textValue, setTextValue] = useState("");
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);

  const handleChange = ({ target }) => {
    setTextValue(target.value);
  };
  return (
    <div className={style.wrapper}>
      <div className={style.info}>
        <span>
          Time: <strong>{time}s</strong>
        </span>
        <span>
          Mistakes: <strong>{mistakes}</strong>
        </span>
      </div>
      <p className="content">{123}</p>
      <TextAreaField
        placeholder="Введите текст здесь"
        onChange={handleChange}
        value={textValue}
      />
      <Button>Начать тест</Button>
    </div>
  );
};
