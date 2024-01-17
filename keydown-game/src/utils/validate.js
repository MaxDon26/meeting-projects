export const keyIsValid = (letter) => {
  const pattern = /[а-я-]/i;

  return pattern.test(letter);
};

export const keyIsExist = (letter, keys) => {
  return keys.map((el) => el.toLowerCase()).includes(letter.toLowerCase());
};

export const complitedWord = (word, keys) => {
  console.log(word, keys);
  return word.split("").every((char) => keys.includes(char.toLowerCase()));
};
export const checkMistakes = (word, char) => {
  return word
    .split("")
    .map((el) => el.toLowerCase())
    .includes(char.toLowerCase());
};
