import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from "../constants/colors";
import {Fonts} from "../constants/fonts";

const MainButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.6}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  buttonText: {
    color: 'white',
    fontFamily: Fonts.bodyText,
    fontSize: 18
  }
});

export default MainButton;
