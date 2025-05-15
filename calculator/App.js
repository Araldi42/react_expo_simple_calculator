import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Provider as PaperProvider, Button, Text, Surface } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    switch (operator) {
      case '+':
        return firstOperand + inputValue;
      case '-':
        return firstOperand - inputValue;
      case '*':
        return firstOperand * inputValue;
      case '/':
        return firstOperand / inputValue;
      default:
        return inputValue;
    }
  };

  const handleEquals = () => {
    if (!operator) return;

    const inputValue = parseFloat(display);
    const result = performCalculation();
    
    setDisplay(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <Surface style={styles.displayContainer}>
          <Text style={styles.displayText}>{display}</Text>
        </Surface>
        
        <View style={styles.buttonRow}>
          <Button mode="contained" style={styles.button} labelStyle={styles.buttonText} onPress={() => clearDisplay()}>
            C
          </Button>
          <Button mode="contained" style={styles.button} labelStyle={styles.buttonText} onPress={() => handleOperator('/')}>
            /
          </Button>
          <Button mode="contained" style={styles.button} labelStyle={styles.buttonText} onPress={() => handleOperator('*')}>
            ×
          </Button>
          <Button mode="contained" style={styles.button} labelStyle={styles.buttonText} onPress={() => handleOperator('-')}>
            -
          </Button>
        </View>
        
        <View style={styles.buttonRow}>
          <Button mode="contained" style={styles.button} labelStyle={styles.buttonText} onPress={() => inputDigit('7')}>
            7
          </Button>
          <Button mode="contained" style={styles.button} labelStyle={styles.buttonText} onPress={() => inputDigit('8')}>
            8
          </Button>
          <Button mode="contained" style={styles.button} labelStyle={styles.buttonText} onPress={() => inputDigit('9')}>
            9
          </Button>
          <Button mode="contained" style={styles.button} labelStyle={styles.buttonText} onPress={() => handleOperator('+')}>
            +
          </Button>
        </View>
        
        <View style={styles.buttonRow}>
          <Button mode="contained" style={styles.button} labelStyle={styles.buttonText} onPress={() => inputDigit('4')}>
            4
          </Button>
          <Button mode="contained" style={styles.button} labelStyle={styles.buttonText} onPress={() => inputDigit('5')}>
            5
          </Button>
          <Button mode="contained" style={styles.button} labelStyle={styles.buttonText} onPress={() => inputDigit('6')}>
            6
          </Button>
          <Button mode="contained" style={styles.equalButton} labelStyle={styles.buttonText} onPress={() => handleEquals()}>
            =
          </Button>
        </View>
        
        <View style={styles.buttonRow}>
          <Button mode="contained" style={styles.button} labelStyle={styles.buttonText} onPress={() => inputDigit('1')}>
            1
          </Button>
          <Button mode="contained" style={styles.button} labelStyle={styles.buttonText} onPress={() => inputDigit('2')}>
            2
          </Button>
          <Button mode="contained" style={styles.button} labelStyle={styles.buttonText} onPress={() => inputDigit('3')}>
            3
          </Button>
          <Button mode="contained" style={styles.equalButton} labelStyle={styles.buttonText} onPress={() => handleEquals()}>
            =
          </Button>
        </View>
        
        <View style={styles.buttonRow}>
          <Button mode="contained" style={[styles.button, styles.zeroButton]} labelStyle={styles.buttonText} onPress={() => inputDigit('0')}>
            0
          </Button>
          <Button mode="contained" style={styles.button} labelStyle={styles.buttonText} onPress={() => inputDecimal()}>
            .
          </Button>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  displayContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 4,
  },
  displayText: {
    fontSize: 40,
    textAlign: 'right',
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#6200ee',
  },
  zeroButton: {
    flex: 2,
  },
  equalButton: {
    backgroundColor: '#03dac6',
    flex: 1,
    marginHorizontal: 4,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
});
