import React, { useState } from 'react'
import {Text, TextInput, View, StyleSheet, Modal, Button} from "react-native"

function NewEventModal({startDates}) {

  const [startDate, setStartDate] = useState(startDates)

  return (
    <View style={{flex: 1, width: "100%"}}>
        <Text style={{ textAlign: "center", fontSize: 10, fontWeight: "light"}}>* povinné údaje</Text>
        <View style={{marginHorizontal: 15}}>
            <TextInput style={styles.input} placeholder='Název *' />
            <TextInput style={styles.input} placeholder='Místo *' />
            <TextInput style={styles.input} value={startDate} placeholder='Datum *' onChange={() => setStartDate(e.current.value)}/>
            <TextInput style={styles.input} placeholder='Čas od' />
            <TextInput style={styles.input} placeholder='Čas do' />
        </View>
        <View style={{flexDirection: 'row', marginHorizontal: "auto"}}>
        </View>
    </View>
  )
}

export default NewEventModal

const styles = StyleSheet.create({
    input: {
        marginVertical: 4,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    }
})