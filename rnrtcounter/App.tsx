import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import CounterScreen from './src/screens/CounterScreen'

const App = () => {
  return (
   <Provider store={store}>
    <CounterScreen/>
   </Provider>
  )
}

export default App;