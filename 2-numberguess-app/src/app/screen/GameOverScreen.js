import React from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import {Colors} from "../constants/colors";
import {Fonts} from "../constants/fonts";
import MainButton from "../components/MainButton";

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is over</TitleText>
      <View style={styles.imageContainer}>
        <Image
          fadeDuration={4000}
          style={styles.image}

          // Link by File
          source={require('../assets/images/success.png')}

          // Lik by URL (always needs Width and Height)
          // source={{uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'}}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess
          number <Text style={styles.highlight}>{props.userNumber}</Text>.
        </BodyText>
      </View>
      <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    width: 300,
    height: 300,
    overflow: 'hidden',
    marginVertical: 30
  },
  image: {
    width: '100%',
    height: '100%'
  },
  highlight: {
    color: Colors.primary,
    fontFamily: Fonts.titleText
  },
  resultContainer: {
    marginHorizontal: 40,
    marginVertical: 15
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20
  }
});

export default GameOverScreen;
