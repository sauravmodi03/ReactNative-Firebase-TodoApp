import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../components/Styles';
import { bg } from '../img/bg.jpg';

function Welcome({ navigation }) {
    return (
        <ImageBackground style={styles.imgContainer} source={bg} resizeMode="cover">
            <SafeAreaView style={styles.flexContainer}>
                <View style={styles.wrapper}>
                    <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate("Register")}>
                        <Text style={styles.font}>Create Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.font}>Login</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const st = StyleSheet.create({
    container: {
        flex: 1,
    },
    bg: {
        flex: 1,
        justifyContent: 'center'
    },
    loginButton: {
        width: '80%',
        backgroundColor: '#569DAA',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center'
    },
})

export default Welcome;