import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
} from "react-native";
import Card from "../Components/Card";
import MainButton from "../Components/MainButton";
import NumberContainer from "../Components/NumberContainer";
import DefalutStyles from "../constants/DefalutStyles";
import { Ionicons } from "@expo/vector-icons";
import BodyText from "../Components/BodyText";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (listLength, itemData) => {
  return (
    <View style={styles.listItem}>
      <BodyText>#{listLength - itemData.index}</BodyText>
      <Text>{itemData.item}</Text>
    </View>
  );
};

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.useChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setpastGuesses] = useState([initialGuess.toString()]);
  const [avaliableDeviceWidth, setAvaliableDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [avaliableDeviceHeight, setAvaliableDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setAvaliableDeviceWidth(Dimensions.get("window").width);
      setAvaliableDeviceHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setpastGuesses((curPastGuesses) => [
      nextNumber.toString(),
      ...curPastGuesses,
    ]);
  };

  let listItemContainerStyle = styles.listItemContainer;

  if (avaliableDeviceWidth < 350) {
    listItemContainerStyle = styles.listItemContainerBig;
  }

  if (avaliableDeviceHeight < 500) {
    <View style={styles.screen}>
      <Text style={DefalutStyles.title}>Oppenent's Guess</Text>
      <View style={styles.controls}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>

        <NumberContainer>{currentGuess}</NumberContainer>

        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </View>
      <View style={listItemContainerStyle}>
        {/*<ScrollView contentContainerStyle={styles.listContent}>*/}
        {/*  {pastGuesses.map((guess, index) =>*/}
        {/*    renderListItem(guess, pastGuesses.length - index)*/}
        {/*  )}*/}
        {/*</ScrollView>*/}
        <FlatList
          contentContainerStyle={styles.listContent}
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
        />
      </View>
    </View>;
  }

  return (
    <View style={styles.screen}>
      <Text style={DefalutStyles.title}>Oppenent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={listItemContainerStyle}>
        {/*<ScrollView contentContainerStyle={styles.listContent}>*/}
        {/*  {pastGuesses.map((guess, index) =>*/}
        {/*    renderListItem(guess, pastGuesses.length - index)*/}
        {/*  )}*/}
        {/*</ScrollView>*/}
        <FlatList
          contentContainerStyle={styles.listContent}
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
    width: 300,
    maxWidth: "80%",
  },
  listContent: {
    flexGrow: 1,
    // alignItems: "center",
    justifyContent: "flex-end",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center",
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    justifyContent: "space-between",
    width: "100%",
  },
  listItemContainer: {
    flex: 1,
    width: "60%",
  },
  listItemContainerBig: {
    flex: 1,
    width: "80%",
  },
});

export default GameScreen;
