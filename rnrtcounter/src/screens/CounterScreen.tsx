import { StyleSheet, Text, View ,Button} from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { increment, decrement, reset } from '../redux/counterSlice'

const CounterScreen = () => {

    const count= useSelector((state: RootState) => state.counter.value)
    const dispatch= useDispatch();

    

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Counter: {count}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Increment" onPress={() => dispatch(increment())} />
        <Button title="Decrement" onPress={() => dispatch(decrement())} />
        <Button title="Reset" onPress={() => dispatch(reset())} />
      </View>
      </View>
  )
}

export default CounterScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    counterText: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 10,
    },
  });
  