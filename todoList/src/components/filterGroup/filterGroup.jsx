import { SegmentedControl } from "@mantine/core";
import classes from "./GradientSegmentedControl.module.css";

// eslint-disable-next-line react/prop-types
export function FilterGroup({ onChange }) {
  const handleChange = (type) => {
    let filterType;
    switch (type) {
      case "All":
        filterType = null;
        break;
      case "Done":
        filterType = true;
        break;
      case "In progress":
        filterType = false;
        break;

      default:
        break;
    }

    onChange(filterType);
  };
  return (
    <SegmentedControl
      onChange={handleChange}
      mt={15}
      radius="xl"
      size="md"
      data={["All", "Done", "In progress"]}
      classNames={classes}
    />
  );
}
