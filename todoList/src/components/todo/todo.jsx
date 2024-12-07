/* eslint-disable react/prop-types */

import { UnstyledButton, Checkbox, Text } from "@mantine/core";
import classes from "./CheckboxCard.module.css";

export function Todo({ content, completed, id, created, onUpdate }) {
  const handleClick = () => {
    onUpdate({ completed: !completed, id, content, created });
  };
  return (
    <UnstyledButton
      bg={"#ffffff60"}
      onClick={handleClick}
      className={classes.button}
    >
      <Checkbox
        checked={completed}
        onChange={() => {}}
        tabIndex={-1}
        size="md"
        mr="xl"
        styles={{ input: { cursor: "pointer" } }}
        aria-hidden
      />

      <div>
        <Text fw={500} mb={7} lh={1}>
          {content}
        </Text>
        <Text fz="sm">{`${new Date(created).toLocaleDateString(
          "ru-RU"
        )}  ${new Date(created).toLocaleTimeString("ru-RU")}`}</Text>
      </div>
    </UnstyledButton>
  );
}
