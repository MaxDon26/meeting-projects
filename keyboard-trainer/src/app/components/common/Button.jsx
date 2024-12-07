/* eslint-disable react/prop-types */
import style from "./style.module.css";

export const Button = ({ children }) => {
  return <button className={style.submit}>{children}</button>;
};
