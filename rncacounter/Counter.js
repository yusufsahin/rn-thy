import { View, Text ,Button} from 'react-native'
import React, { useContext } from 'react'
import { CounterContext } from './CounterContext'

const Counter = () => {
 const {count,dispatch}= useContext(CounterContext)

  return (
    <View style={{ alignItems: "center" }}>
    <Text style={{ fontSize: 32, marginBottom: 10 }}>Count: {count}</Text>
    <Button title="Increase" onPress={() => dispatch({ type: "INCREMENT" })} />
    <View style={{ margin: 5 }} />
    <Button title="Decrease" onPress={() => dispatch({ type: "DECREMENT" })} />
    <View style={{ margin: 5 }} />
    <Button title="Reset" onPress={() => dispatch({ type: "RESET" })} />
  </View>
  )
}

export default Counter