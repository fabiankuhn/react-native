import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 90,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 36,
        backgroundColor: Colors.primary
    },
    headerTitle: {
        color: "black",
        fontSize: 18
    }
})

export default Header;