import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TIcon } from "../types";

const Icon = ({ color, name, size, style }: TIcon) => (
  <Ionicons name={name} size={size} color={color} style={style} />
);

export default Icon;
