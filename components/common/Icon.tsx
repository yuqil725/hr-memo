import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TIcon } from "../../interfaces/general";

const Icon = ({ color, name, size, style }: TIcon) => (
  <Ionicons name={name} size={size} color={color} style={style} />
);

export default Icon;
