import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BodyText from "../Components/BodyText";
import MainButton from "../Components/MainButton";
import TitleText from "../Components/TitleText";
import colors from "../constants/colors";

const GameOverScreen = (props) => {
  const [avaliableDeviceWidth, setAvaliableDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [avaliableDeviceHeight, setavaliableDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const updateLayouts = () => {
      setAvaliableDeviceWidth(Dimensions.get("window").width);
      setavaliableDeviceHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateLayouts);

    return () => {
      Dimensions.removeEventListener("change", updateLayouts);
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is Over</TitleText>
        <View
          style={{
            ...styles.imageContainer,
          }}
        >
          <Image
            source={require("../assets/success.png")}
            style={styles.image}
          />
          {/* <Image
          source={{
            uri: "https://www.history.com/.image/c_fill%2Ccs_srgb%2Cfl_progressive%2Ch_400%2Cq_auto:good%2Cw_620/MTU3ODc4NjAyNDU0ODY5MzIx/hith-7-things-you-should-know-about-mount-everest-2.jpg",
          }}
          fadeDuration={1000}
          style={styles.image}
        /> */}
        </View>
        <View
          style={{
            ...styles.resultContainer,
            ...{
              marginVertical: avaliableDeviceHeight / 60,
            },
          }}
        >
          <BodyText
            style={{
              ...styles.resultText,
              ...{
                fontSize: avaliableDeviceHeight < 400 ? 16 : 20,
              },
            }}
          >
            Your Phone needed
            <Text style={styles.highLight}> {props.roundsNumber} </Text> rounds
            to guess the number
            <Text style={styles.highLight}> {props.userNumber}</Text>
          </BodyText>
        </View>
        <MainButton onPress={props.onRestart}>New Game</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  imageContainer: {
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    // borderRadius: 15,
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  highLight: {
    color: colors.primary,
    fontFamily: "open-sans-bold",
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get("window").height / 60,
  },
  resultText: {
    textAlign: "center",
    // fontSize: 20,
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
  },
});

export default GameOverScreen;
