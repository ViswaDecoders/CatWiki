import React from "react";
import { Text, StyleSheet } from "react-native";
import colors from "../config/colors";

function Headings({ children, style }) {
  return <Text style={[styles.head, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  head: {
    fontSize: 35,
    fontWeight: "bold",
    fontStyle: "normal",
    alignSelf: "center",
    color: colors.orange,
    textDecorationLine: "Underline",
  },
});

export default Headings;
