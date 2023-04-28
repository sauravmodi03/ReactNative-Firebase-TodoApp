import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { styles } from '../components/Styles'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, dbName } from '../../firebaseConfig';
import { Text } from 'react-native-elements';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';

function Account(props) {

    const [user] = useAuthState(auth);
    const [userData, setUser] = useState({});

    const loadUserData = async () => {
        const ref = doc(db, dbName, user.uid);
        await getDoc(ref).then((res) => {
            setUser(res.data());
            console.log(user);
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <SafeAreaView style={[styles.flexContainer, st.background]}>
            <View style={st.infoWrapper}>
                <Text style={st.labelFont}>First Name:</Text>
                <Text style={st.infoFont}>{userData.fname}</Text>
            </View>
            <View style={st.infoWrapper}>
                <Text style={st.labelFont}>Last Name:</Text>
                <Text style={st.infoFont}>{userData.lname}</Text>
            </View>
            <View style={st.infoWrapper}>
                <Text style={st.labelFont}>Email:</Text>
                <Text style={st.infoFont}>{userData.email}</Text>
            </View>
        </SafeAreaView>
    );
}

const st = StyleSheet.create({
    background: {
        justifyContent: 'center',
        backgroundColor: '#0A4D68',
        alignItems: 'center',
        gap: 10
    },
    labelFont: {
        fontSize: 20,
    },
    infoFont: {
        fontSize: 25,
    },
    infoWrapper: {
        backgroundColor: '#05BFDB',
        justifyContent: 'center',
        width: '80%',
        borderRadius: 10,
        padding: 10,
    }

});

export default Account;