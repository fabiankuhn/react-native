import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert, ScrollView, FlatList} from 'react-native';
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

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}:</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);

const GameScreen = props => {

    // State
    const initialGuess = generateRandomBetween(1, 99, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

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
        setPastGuesses((currentPastGuesses) => [nextNumber.toString(), ...currentPastGuesses]);
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
              {/*<ScrollView contentContainerStyle={styles.list}>*/}
              {/*    {pastGuesses.map((guess, index) => (*/}
              {/*      renderListItem(guess, pastGuesses.length - index)*/}
              {/*    ))}*/}
              {/*</ScrollView>*/}

              <FlatList
                data={pastGuesses}
                renderItem={renderListItem.bind(this, pastGuesses.length)}
                keyExtractor={(item => item)}
                contentContainerStyle={styles.list}
              >
              </FlatList>
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
        width: '60%',
        marginVertical: 20
    },
    list: {
        flexGrow: 1, // Needed for Bottom Up View
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        marginVertical: 10,
        padding: 15,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
});

export default GameScreen;
