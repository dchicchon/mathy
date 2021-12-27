import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

// Create a component that will hold the card for the math equation

// just send the user the numbers and let the user calculate the items on their page

// We start our test and get 10 problems to do. We can either

const ProblemCard = ({ problem, setProblem, type }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (parseInt(input) === problem.ans) {
      setInput('')
      setProblem(prevState => prevState + 1)
    }
  }, [input])

  return (<View>
    <View style={{ width: 100 }}>
      {problem.nums.map((num, i) => (
        <Text
          key={i}
          style={{
            fontSize: 40,
            textAlign: 'right'
          }}>
          {i === problem.nums.length - 1 ? `${type} ${num}` : num}
        </Text>
      ))}
    </View>
    <TextInput
      value={input}
      onChangeText={(text) => setInput(text)}
      autoFocus={true}
      keyboardType='decimal-pad'
      style={{
        textAlign: 'center',
        borderRadius: 25,
        fontSize: 40,
        width: 150,
        height: 75,
        borderColor: 'gray',
        borderWidth: 1
      }}
    />
  </View>)
}

// make a add, subtract, multiplier, divider problem sets
// let users get points? for completing problem sets 
// points will allow users to customize the animations/sounds homepage that they get when they open their app

// This is going to the component that will show a variety of problem sets. Will keep track of time here

const ProblemSet = ({ problemArr, navigation, type }) => {
  const [time, setTime] = useState(0)
  const [problemNum, setProblemNum] = useState(0)
  let intervalRef = useRef();

  useFocusEffect(
    React.useCallback(() => {
      console.log("callback")
      intervalRef.current = setInterval(() => setTime(prevState => prevState + 1), 1000)
      return () => clearInterval(intervalRef.current)
    }))

  useEffect(() => {
    console.log("Use Effect")
    if (problemNum === problemArr.length) clearInterval(intervalRef.current)
  }, [problemNum])



  function reset() {
    intervalRef.current = setInterval(() => setTime(prevState => prevState + 1), 1000)
    setProblemNum(0);
    setTime(0)
  }

  if (problemNum === problemArr.length) {
    return (
      <>
        <Text>You completed the problem set in {time} seconds! Congratulations</Text>
        <Button onPress={() => navigation.navigate("Home")} title='Home' />
        <Button onPress={reset} title='Restart Problem Set' />
      </>
    )
  }

  return (
    <>
      <ProblemCard problem={problemArr[problemNum]} setProblem={setProblemNum} type={type} />
    </>
  )
}

const GamePage = ({ navigation, route }) => {
  const { type } = route.params
  const [problemArr, setProblemArr] = useState([])

  function createProblemArr() {
    console.log("Create Problem Set")
    // make 10 randomly generated problems for the user to do
    // create the problems here and then place the answer in it as well
    let newproblemArr = []
    for (let i = 0; i < 10; i++) {
      let nums = new Array(Math.round(Math.random() * 100), Math.round(Math.random() * 100)).sort((a, b) => b - a)
      let ans = 0;
      switch (type) {
        case '+':
          ans = nums.reduce((a, b) => a + b)
          break;
        case '-':
          ans = nums.reduce((a, b) => (Math.abs(a - b)))
          break;
        case 'x':
          ans = nums.reduce((a, b) => (a * b))
          break;
      }
      // i have ans here
      let problem = {
        nums,
        ans
      }
      newproblemArr.push(problem)
    }
    console.log(newproblemArr)
    setProblemArr(newproblemArr);
  }

  useEffect(() => {
    createProblemArr();
  }, [])

  return (
    <View style={styles.container}>
      <ProblemSet problemArr={problemArr} navigation={navigation} type={type} />
      <StatusBar style="auto" />
    </View>
  )
}

const HomePage = ({ navigation }) => {

  return (
    <View>
      <Text>Mathy</Text>

      {/* Make several of these */}
      <Button title='Addition' onPress={() => navigation.navigate('Game', { type: '+' })} />
      <Button title='Subtraction' onPress={() => navigation.navigate('Game', { type: '-' })} />
      <Button title='Multiplication' onPress={() => navigation.navigate('Game', { type: 'x' })} />
    </View>
  )
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomePage} />
        <Stack.Screen name='Game' component={GamePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  },
});
