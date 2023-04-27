import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { styles } from '../components/Styles';
import { query, collection, getDocs, where } from 'firebase/firestore';

import { db, auth, dbName } from '../../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import CheckBox from '@react-native-community/checkbox';

function Home({ navigation }) {


    const [todos, setTodos] = useState([]);

    const [user] = useAuthState(auth);

    async function loadData() {
        const q = query(collection(db, dbName), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setTodos(doc.data().todos);
        });
        console.log(todos);
    }

    const updateTodo = (i, val) => {
        todos[i].completed = val;
    }



    useEffect(() => {
        loadData();
    }, []);


    return (
        <SafeAreaView style={styles.flexContainer}>
            <View style={styles.header}>
                <Text onPress={() => props.navigation.navigate("Home")} style={styles.font}>Back</Text>
                <Text style={styles.font}>New Record</Text>
                <Text style={styles.font}>Cancel</Text>
            </View>
            <View>
                {todos.map((todo, i) =>
                    <View key={i} style={styles.flexCenter}>
                        <Text style={styles.font}>{todo.task}</Text>
                        <CheckBox
                            value={todo.completed}
                            onValueChange={updateTodo(i, todo.completed)}
                        />
                    </View>
                )
                }
            </View>
        </SafeAreaView>
    );
}

export default Home;