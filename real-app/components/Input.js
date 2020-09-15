import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const Input = props => {
    return (
        <TextInput {...props} style={{...styles.input, ...props.style}} />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginVertical: 10
    }
});

export default Input;