import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0);


    useEffect(() => {
        console.log(`Butona ${count} kez tıklandı.`);
    }, [count]);

    useEffect(() => {
        if (count === 5) {
          alert("5 defa tıkladın!");
        }
      }, [count]);
      
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Butona {count} kez tıklandı</Text>
  
        <TouchableOpacity style={styles.button} onPress={() => setCount(count + 1)}>
          <Text style={styles.buttonText}>Tıkla!</Text>
        </TouchableOpacity>
      </View>
    );
  };


export default Counter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      },
      text: {
        fontSize: 20,
        marginBottom: 20,
      },
      button: {
        backgroundColor: "#007bff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      buttonText: {
        color: "white",
        fontSize: 18,
      },
})