import React from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../components/Styles';

function Home({ navigation }) {
    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.wrapper}>
                <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.font}>Create Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.font}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Home;