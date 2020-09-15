import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert, ScrollView} from 'react-native';
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import DefaultStyles from "./../constants/default-styles"
import MainButton from "../components/MainButton";
import { Ionicons } from '@expo/vector-icons';
import BodyText from "../components/BodyText";
import styled from 'styled-components';



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

const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
        <BodyText>#{numOfRound}:</BodyText>
        <BodyText>{value}</BodyText>
    </View>
);

const GameScreen = props => {

    // State
    const initialGuess = generateRandomBetween(1, 99, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);

    // Value gets stored in Lifecycle. Does not cause re-render
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    // Runs after every render function
    useEffect(() => {
        if(currentGuess === props.userChoice){
            props.onGameOver(pastGuesses.length)
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if(
          (direction === 'lower' && currentGuess < props.userChoice) ||
          (direction === "greater" && currentGuess > props.userChoice)
        ){
            Alert.alert('Don\'t lie', 'You know that this is wrong...', [{text: 'sorry', style: "cancel"}]);
            return;
        }

        if(direction === 'lower') {
            currentHigh.current = currentGuess - 1;
        } else {
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses((currentPastGuesses) => [nextNumber, ...currentPastGuesses]);
    };

    return (
      <View style={styles.screen}>
          <Text style={DefaultStyles.bodyTitle}>Opponent's Guess</Text>
          <NumberContainer>{currentGuess}</NumberContainer>
          <Card style={styles.buttonContainer}>
              <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                  <Ionicons name="md-remove" size={24} color="white" />
              </MainButton>
              <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                  <Ionicons name="md-add" size={24} color="white" />
              </MainButton>
          </Card>
          <View style={styles.listContainer}>
              <ScrollView contentContainerStyle={styles.list}>
                  {pastGuesses.map((guess, index) => (
                    renderListItem(guess, pastGuesses.length - index)
                  ))}
              </ScrollView>
          </View>
      </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '95%'
    },
    listContainer: {
        flex: 1, // Needed for Android
        width: '80%',
        marginVertical: 20
    },
    list: {
        flexGrow: 1, // Needed for Bottom Up View
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        margin: 10,
        padding: 15,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%'
    }
});

export default GameScreen;
