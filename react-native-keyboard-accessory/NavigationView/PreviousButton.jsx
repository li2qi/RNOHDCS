import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';

import {KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory';


let inputs = [
  {
    placeholder: 'Dummy Text Input',
  },
  {
    keyboardType: 'email-address',
    placeholder: 'Dummy Text Input Email',
  },
  {
    keyboardType: 'numeric',
    placeholder: 'Dummy Text Input Numeric',
  },
  {
    placeholder: 'Dummy Text Input',
  },
  {
    keyboardType: 'email-address',
    placeholder: 'Dummy Text Input Email',
  },
  {
    keyboardType: 'numeric',
    placeholder: 'Dummy Text Input Numeric',
  },
];


const CustomButton = ({ text, onPress, buttonStyle, textStyle }) => (
  <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
    <Text style={[styles.text, textStyle]}>{text}</Text>
  </TouchableOpacity>
);

class PreviousButton extends Component {
  constructor(props) {
    super(props);

    inputs = inputs.map(input => ({
      ref: React.createRef(),
      ...input,
    }));

    this.state = {
      activeInputIndex: 0,
      nextFocusDisabled: false,
      previousFocusDisabled: false,
      buttonsDisabled: false,
      buttonsHidden: false,
    };
  }

  handleFocus = index => () => {
    this.setState({
      nextFocusDisabled: index === inputs.length - 1,
      previousFocusDisabled: index === 0,
      activeInputIndex: index,
    });
  }

  handleFocusNext = () => {
    const { nextFocusDisabled, activeInputIndex } = this.state;
    if (nextFocusDisabled) {
      return;
    }

    inputs[activeInputIndex + 1].ref.current.focus();
  }

  handleFocusPrevious = () => {
    const { previousFocusDisabled, activeInputIndex } = this.state;
    if (previousFocusDisabled) {
      return;
    }
    inputs[activeInputIndex - 1].ref.current.focus();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          { inputs.map(({ placeholder, keyboardType, ref }, index) =>
            <TextInput
              key={`input_${index}`}
              ref={ref}
              style={styles.textInput}
              underlineColorAndroid="transparent"
              placeholder={placeholder}
              keyboardType={keyboardType}
              blurOnSubmit={false}
              onFocus={this.handleFocus(index)}
            />
          )}
        </ScrollView>
        <KeyboardAccessoryNavigation
          doneButton={<CustomButton
            text="done111"
            buttonStyle={{ backgroundColor: 'red', marginTop: 15 }}
            textStyle={{ fontSize: 18 }}
          />}
          nextButton={<CustomButton
            text="next222"
            buttonStyle={{ backgroundColor: '#52cce7', marginTop: 15 }}
            textStyle={{ fontSize: 18 }}
            onPress={this.handleFocusNext}
          />}
          previousButton = {<CustomButton
            text="pre333"
            buttonStyle={{ backgroundColor: '#25f95c', marginTop: 15 }}
            textStyle={{ fontSize: 18 }}
            onPress={this.handleFocusPrevious}
          />}
          avoidKeyboard
          androidAdjustResize
        />
      </View>
    );
  }
}
PreviousButton.navigationOptions = {
  title: 'Navigation View Example',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    padding: 30,
  },
  textInput: {
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CCC',
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
});

export {PreviousButton}
