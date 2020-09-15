# NumberGuessing-App
Simple game, where a number is selected. The computer than guesses numbers within a range and tips can be given (higher or lower number).

## Concepts
- Styling
    - Global Colors
    - Scoped Styling
    - Global Styling
    - Component Interaction
- React Hooks

    
## React Hooks
useState: Destructured const for value and setter. The UI gets re-rendered when the state changes.
```jsx
const [currentGuess, setCurrentGuess] = useState(
  generateRandomBetween(1, 99, props.userChoice)
);
``` 
useRef: The useRef contains a current value, that stays present for the lifecycle of the component. The UI does not get re-rendered. 
```jsx
const currentHigh = useRef(100);
currentHigh.current = currentGuess;
```

useEffect: The useEffect listens for state changes. In this case in `[currentGuess, userChoice, onGameOver]`. If the state changes the specified function gets executed.
```jsx
useEffect(() => {
    if(currentGuess === props.userChoice){
        props.onGameOver(rounds)
    }
}, [currentGuess, userChoice, onGameOver]);
```
    
## Styling
Method 1: Component
- Preferred Way to reuise Styling
- `props.children` contains the Input of Parent
- `{...props.style, ...styles.bodyText}` uses destructuring to bind scoped styling with inherited styling of parent.


```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BodyText = props => {
  return (
    <View>
      <Text style={{...props.style, ...styles.bodyText}}>{props.children}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  bodyText: {
    fontFamily: 'open-sans'
  }
});

export default BodyText;
```

Method 2: fonts.js
```jsx
export const Fonts  = {
  bodyText: 'open-sans',
  titleText: 'open-sans-bold'
};
```

Method 3: default-styles.js
```jsx
import {StyleSheet} from "react-native";

export default StyleSheet.create({
  bodyText: {
    fontFamily: 'open-sans'
  },
  bodyTitle: {
    fontFamily: 'open-sans-bold'
  }
});
```

Import in header.js
```jsx
const styles = StyleSheet.create({
    headerTitle: {
        fontFamily: Fonts.titleText, // Method 2
        ...DefaultStyles.bodyTitle // Method 3
    }
});
```

