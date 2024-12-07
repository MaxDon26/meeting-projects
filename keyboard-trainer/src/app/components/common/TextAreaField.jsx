import style from "./style.module.css";

export const TextAreaField = (props) => {
  return <textarea rows={5} className={style.textArea} {...props} />;
};
