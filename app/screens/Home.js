import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, Image, Modal } from 'react-native';
import { styles } from '../components/Styles';
import { query, collection, getDocs, where, doc, updateDoc } from 'firebase/firestore';

import { db, auth, dbName } from '../../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import CheckBox from '@react-native-community/checkbox';
import AddTodo from './AddTodo';

function Home({ navigation }) {


    const [todos, setTodos] = useState([]);
    const [showModal, setModal] = useState(false);

    const [user] = useAuthState(auth);

    async function loadData() {
        const q = query(collection(db, dbName), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setTodos(doc.data().todos);
        });
    }

    const updateTodo = async (i, val) => {
        console.log(todos[i].completed, val);
        todos[i].completed = val;
        const ref = doc(db, dbName, user.uid);
        await updateDoc(ref, {
            todos: todos
        });

        // console.log(e.);
        //todos[i].completed = val;
    }

    const addNewTodo = () => {
        setModal(true);
    }


    useEffect(() => {
        loadData();
    }, [showModal]);


    return (
        <SafeAreaView style={styles.flexContainer}>
            <View style={[styles.flexContainer, st.wrapper]}>
                {todos.map((todo, i) =>
                    <View key={i} style={st.todoWrapper}>
                        <View style={st.todoItem}><Text style={[styles.font]}>{todo.task}</Text></View>
                        <CheckBox
                            value={todo.completed}
                            onValueChange={() => updateTodo(i, !todo.completed)}
                        />
                    </View>
                )
                }
            </View>
            <View style={styles.footer}>
                <Text style={styles.font} onPress={addNewTodo}>Add</Text>
            </View>
            <Modal animationType="slide" visible={showModal} transparent={true}>
                <AddTodo setModal={setModal} />
            </Modal>
        </SafeAreaView>
    );
}

const st = StyleSheet.create({
    todoWrapper: {
        width: '80%',
        height: 50, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', alignContent: 'space-between',
    },
    wrapper: {
        gap: 10,
        alignItems: 'center',
        paddingTop: 20
    },
    todoItem: {
        width: 200,
        backgroundColor: 'dodgerblue',
        borderRadius: 10,
        padding: 5
    }

})

export default Home;