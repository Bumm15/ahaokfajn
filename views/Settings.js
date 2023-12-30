import { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, Switch, Text } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeSetting = async (key, value) => {
    
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log(`Storing ${key}: ${jsonValue}`);
      //console.log(`Loading ${key}: ${jsonValue}`);
    } catch (e) {
      // saving error
      console.error('Error storing the setting', e);
    }
  };

  const loadSetting = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
        //console.log(`Storing ${key}: ${jsonValue}`);
    console.log(`Loading ${key}: ${jsonValue}`);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.error('Error loading the setting', e);
      return null;
    }
  };

const SettingsView = () => {
    const [newEventNotif, setNewEventNotif] = useState(loadSetting('newEventNotif') ? loadSetting('newEventNotif'):false);
    const [newChatNotif, setNewChatNotif] = useState(loadSetting('newChatNotif') ? loadSetting('newChatNotif'):false);
    const [syncData, setSyncData] = useState(loadSetting('syncData') !== null ? loadSetting('syncData'):false);
    const [darkMode, setDarkMode] = useState(loadSetting('darkMode') ? loadSetting('darkMode'):false);

    const toggleEventNotif = () => {
        setNewEventNotif(!newEventNotif)
        storeSetting('newEventNotif', !newEventNotif);
    }
    const toggleChatNotif = () => {
        setNewChatNotif(!newChatNotif)
        storeSetting('newChatNotif', !newChatNotif);
    }
    const toggleDataSync = () => {
        setSyncData(!syncData)
        storeSetting('syncData', !syncData);
    };
    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
        storeSetting('darkMode', !darkMode);
    };

    

    return (
    <SafeAreaView style={{flex: 1, margin: 10, flexDirection: "column", gap: 10}}>
        <View style={styles.headerBox}>

            <Text style={styles.header}>Oznámení</Text>
            <View style={styles.switchSettings}>
                <Text style={{fontSize: 15}}>Oznámení o nové akci</Text>
                <Switch
                    style={{ transform: [{ scaleX: 0.8 }, { scaleY: .8 }] }}
                    onValueChange={toggleEventNotif}
                    value={newEventNotif}
                />
            </View>
            <View style={styles.switchSettings}>
            <Text style={{fontSize: 15}}>Oznámení o nové zprávě</Text>
            <Switch
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: .8 }] }}
                onValueChange={toggleChatNotif}
                value={newChatNotif}
                />
            </View>
        </View>

        <View style={styles.headerBox}>
            <Text style={styles.header}>Kalendář</Text>
            <View style={styles.switchSettings}>
            <View style={{flexDirection: "column"}}>
                <Text style={{fontSize: 15}}>Synchronizovat soukromé akce</Text>
                <Text style={{fontSize: 10, color: "#A9A9A9"}}>Při ztrátě zařízení dojde k vymazání všech</Text>
                <Text style={{fontSize: 10, color: "#A9A9A9"}}>soukromých akcí.</Text>
            </View>
            <Switch
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: .8 }] }}
                onValueChange={toggleDataSync}
                value={syncData}
                />
            </View>
        </View>

        <View style={styles.headerBox}>
            <Text style={styles.header}>Zobrazení</Text>
            <View style={styles.switchSettings}>
            <View style={{flexDirection: "column"}}>
                <Text style={{fontSize: 15}}>Tmavý režim</Text>
            </View>
            <Switch
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: .8 }] }}
                onValueChange={toggleDarkMode}
                value={darkMode}
                />
            </View>
        </View>
    </SafeAreaView>
        )
}

export default SettingsView;

const styles = StyleSheet.create({
    headerBox: {
        borderRadius: 6, 
        backgroundColor: "#ffffff",
        padding: 15
    },
    header: {
        fontSize: 20,

    },
    switchSettings: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between"
    }
})