import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/app/components/Header'
import StartGameScreen from './src/app/screen/StartGameScreen';
import GameScreen from "./src/app/screen/GameScreen";
import GameOverScreen from "./src/app/screen/GameOverScreen";
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./src/assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./src/assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {

  const[userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded){
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setDataLoaded(true)}
      onError={error => console.log(error)}
    />;
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  let content = <StartGameScreen onStartGame={startGameHandler}/>;
  // let content = <GameOverScreen roundsNumber={20} userNumber={30} onRestart={configureNewGameHandler}/>;

  if(userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>;
  } else if(guessRounds > 0) {
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler}/>
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
