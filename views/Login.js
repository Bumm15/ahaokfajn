import { useState } from "react"
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from "react-native"
import { FIREBASE_AUTH } from "../firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const auth = FIREBASE_AUTH

    const signIn = async () => {
        setLoading(true)
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error)
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return(
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
            <TextInput value={email} style={styles.input} placeholder="E-mail" autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}/>

            <TextInput value={password} style={styles.input} placeholder="Heslo" autoCapitalize="none"
                onChangeText={(text) => setPassword(text)} secureTextEntry={true}/>

            {loading ? <ActivityIndicator size="large" color="#0000ff" />
            : <>
                <Button title="Přihlásit se" onPress={signIn} />
            </>
            }
            </KeyboardAvoidingView>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    }
})