import React, { forwardRef, useState, MutableRefObject } from "react";
import { Text } from "@chakra-ui/react";

export type DynamicTextRef = {
  changeValue: (newValue: string) => void;
};

export const DynamicText = forwardRef<DynamicTextRef>((_, ref) => {
  const [value, setValue] = useState("Random Text");

  const changeValue = (newValue: string) => {
    setValue(newValue);
  };

  (ref as MutableRefObject<DynamicTextRef>).current = { changeValue };

  return (
    <Text noOfLines={2} as="h1">
      {value}
    </Text>
  );
});
