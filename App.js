import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button } from 'react-native';

// Create a component that will hold the card for the math equation


// We start our test and get 10 problems to do. We can either

const ProblemCard = ({ problem, setProblem }) => {
  // nums and type

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
          {i === problem.nums.length - 1 ? `${problem.type} ${num}` : num}
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
const problemArr = [
  {
    nums: [25, 10],
    type: '+',
    ans: 35
  },
  {
    nums: [20, 2],
    type: '-',
    ans: 18

  },
  {
    nums: [25, 10],
    type: 'x',
    ans: 250
  },
  {
    nums: [25, 10],
    type: '+',
    ans: 35
  },

]

const ProblemSet = () => {
  const [time, setTime] = useState(0)
  const [problemNum, setProblemNum] = useState(0)
  let intervalRef = useRef();

  useEffect(() => {
    if (!problemNum) intervalRef.current = setInterval(() => setTime(prevState => prevState + 1), 1000)
    if (problemNum === problemArr.length) clearInterval(intervalRef.current)
  }, [problemNum])

  function reset() {
    setProblemNum(0);
    setTime(0)
  }

  if (problemNum === problemArr.length) {
    return (
      <>
        <Text>You completed the problem set in {time} seconds! Congratulations</Text>
        {/* <Button onPress={gohome} title='Home' /> */}
        <Button onPress={reset} title='Restart Problem Set' />
      </>
    )
  }

  return (
    <>
      {/* <Text>{time}</Text> */}
      <ProblemCard problem={problemArr[problemNum]} setProblem={setProblemNum} />
    </>
  )
}

const HomePage = () => {
  return (
    <View>

    </View>
  )
}

export default function App() {
  return (

    <View style={styles.container}>
      <ProblemSet />
      <StatusBar style="auto" />
    </View>
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
