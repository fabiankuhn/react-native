import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import DefaultStyles from "./../constants/default-styles"
import MainButton from "../components/MainButton";


const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if(rndNum === exclude){
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const GameScreen = props => {

    const [currentGuess, setCurrentGuess] = useState(
      generateRandomBetween(1, 99, props.userChoice)
    );
    const [rounds, setRounds] = useState(0);

    // Value gets stored in Lifecycle. Does not cause re-render
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    // Runs after every render function
    useEffect(() => {
        console.log(props)
        if(currentGuess === props.userChoice){
            props.onGameOver(rounds)
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if(
          (direction === 'lower' && currentGuess < props.userChoice) ||
          (direction === "greater" && currentGuess > props.userChoice)
        ){
            Alert.alert('Don\'t lie', 'You know that this is wrong...', [
              {text: 'sorry', style: "cancel"}
              ]);
            return;
        }

        if(direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(currentRounds => ++currentRounds)
    };

    return (
      <View style={styles.screen}>
          <Text style={DefaultStyles.bodyTitle}>Opponent's Guess</Text>
          <NumberContainer>{currentGuess}</NumberContainer>
          <Card style={styles.buttonContainer}>
              <MainButton title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
              <MainButton title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} />
          </Card>
      </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '95%'
    }
});

export default GameScreen;
