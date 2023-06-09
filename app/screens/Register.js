import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Text, Button } from 'react-native';
import { auth, db, dbName } from '../../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { styles } from '../components/Styles';

import { setDoc, doc } from 'firebase/firestore';

function Register({ navigation }) {

    const [userAuth] = useAuthState(auth);

    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');

    const user = {
        "uid": "",
        "fname": fname,
        "lname": lname,
        "email": email,
        "todos": []
    }

    const handleRegister = async (e) => {
        createUserWithEmailAndPassword(auth, email, password).then((res) => {
            console.log(res.user.uid);
            updateProfile(auth.currentUser, {
                displayName: fname + " " + lname,
                photoURL: 'https://firebasestorage.googleapis.com/v0/b/todo-bcea1.appspot.com/o/images%2Fdefault.jpg?alt=media&token=a3bf914a-9012-486c-8218-b128f3969ec0'
            });
            addUser(res).then((re) => {
                navigation.navigate("HomeScreen");
            });
        })
            .catch((error) => {
                console.log(error);
            });
    }

    const addUser = async (res) => {
        user.uid = res.user.uid;
        console.log(user);
        await setDoc(doc(db, dbName, user.uid), user).then((res) => {
            console.log(res);
        })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <SafeAreaView style={styles.flexCenter}>
            <TextInput
                style={styles.input}
                value={email}
                placeholder='Email'
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                value={fname}
                placeholder='First Name'
                onChangeText={setFname}
            />
            <TextInput
                style={styles.input}
                value={lname}
                placeholder='Last Name'
                onChangeText={setLName}
            />
            <TextInput
                style={styles.input}
                value={password}
                placeholder="Password"
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                value={passwordConf}
                placeholder="Confirm Password"
                onChangeText={setPasswordConf}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.font}>Create Account</Text>
            </TouchableOpacity>
            <Button style={styles.cancelButton} color='white' title='Cancel' onPress={() => navigation.goBack()} />
        </SafeAreaView>
    );
}

const st = StyleSheet.create({
    registerButton: {
        width: '80%',
        backgroundColor: "#577D86",
        borderRadius: 5,
        padding: 10,
        alignItems: 'center'
    },
    cancelButton: {
        backgroundColor: 'red'
    }
});

export default Register;