import React, { useState } from 'react';
import { Button } from 'react-native';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebaseConfig';
import { styles } from '../components/Styles';

function Login({ navigation }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (username != "" && password != "") {
            signInWithEmailAndPassword(auth, username, password).then((ref) => {
                console.log(ref);
                setError("");
                navigation.navigate("HomeScreen");
            })
                .catch((ref) => {
                    console.log(ref);
                    setError('No user found with the email..!!')
                });
        } else {
            setError('Please fill both the field..!!')
        }
    }

    return (
        <SafeAreaView style={[styles.flexContainer]}>
            <View style={styles.header} ><Text onPress={() => navigation.goBack()} style={[st.backButton, st.whiteFont]}>Back</Text></View>
            <View style={styles.wrapper}>
                <Text style={styles.font}>Enter your credentials</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    placeholder='Username'
                    onChangeText={setUsername} />
                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder="Password"
                    onChangeText={setPassword}
                    secureTextEntry={true} />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={[styles.font]}>Login</Text>
                </TouchableOpacity>
                <Button style={styles.cancelButton} color='white' title='Cancel' onPress={() => navigation.goBack()} />
                <Text style={styles.font}>{error}</Text>
            </View>
        </SafeAreaView>
    );
}

const st = StyleSheet.create({
    loginButton: {
        width: '80%',
        backgroundColor: '#569DAA',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center'
    },
    input: {
        width: '80%',
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'lightgrey',
        fontSize: 20
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },
    header: {
        flexDirection: "row",
        height: 50,
        width: '100%',
        alignItems: 'center',
        padding: 10
    },
    backButton: {
        fontSize: 25
    }
});

export default Login;