import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TitleText = props => {
  return (
    <View>
      <Text style={styles.titleText}>{props.children}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'open-sans-bold',
    fontSize: 20
  }
});

export default TitleText;
