import React from "react";
import { Platform, StyleSheet, View } from "react-native";

import colors from "../constants/colors";
import TitleText from "./TitleText";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <TitleText style={styles.headerTitle}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    backgroundColor: Platform.OS === "android" ? colors.primary : "white",

    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomColor: Platform.OS === "ios" ? "#ccc" : "transparent",
    borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
  },
  headerTitle: {
    color: Platform.OS === "ios" ? colors.primary : "white",
    fontSize: 18,
    paddingTop: 20,
    fontFamily: "open-sans-bold",
  },
});

export default Header;
