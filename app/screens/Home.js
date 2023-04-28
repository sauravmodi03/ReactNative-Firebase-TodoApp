import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, Image, Modal, Alert } from 'react-native';
import { styles } from '../components/Styles';
import { query, collection, getDocs, where, doc, updateDoc } from 'firebase/firestore';

import { db, auth, dbName } from '../../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import CheckBox from '@react-native-community/checkbox';
import AddTodo from './AddTodo';
import deleteicon from '../img/delete.png';
import addIcon from '../img/add.png';

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
        todos[i].completed = val;
        const ref = doc(db, dbName, user.uid);
        await updateDoc(ref, {
            todos: todos
        });
    }

    const removeTode = (i) => {
        Alert.alert("Confirm", "Are you sure you want to remove item ? ",
            [{
                text: 'Yes',
                onPress: () => deleteTodo(i)
            },
            {
                text: 'No',
                onPress: () => console.log("Do nothing")
            }
            ])
    }

    const deleteTodo = async (i) => {
        todos.splice(i, 1);
        const ref = doc(db, dbName, user.uid);
        await updateDoc(ref, {
            todos: todos
        });
    }

    useEffect(() => {
        loadData();
    }, [showModal, todos]);


    return (
        <SafeAreaView style={[styles.flexContainer, st.background]}>
            <View style={[styles.flexContainer, st.wrapper]}>
                {todos.map((todo, i) =>
                    <View key={i} style={st.todoWrapper}>
                        <TouchableOpacity onPress={() => removeTode(i)}>
                            <Image source={deleteicon} style={st.delIcon}></Image>
                        </TouchableOpacity>
                        <View style={st.todoItem}><Text style={[styles.font]}>{todo.task}</Text></View>
                        <CheckBox
                            onCheckColor='#05BFDB'
                            onTintColor='#05BFDB'
                            color
                            value={todo.completed}
                            onValueChange={() => updateTodo(i, !todo.completed)}
                        />
                    </View>
                )
                }
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => setModal(true)}>
                    <Image source={addIcon} style={st.addIcon} />
                </TouchableOpacity>
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
        backgroundColor: '#05BFDB',
        borderRadius: 10,
        padding: 5
    },
    background: {
        backgroundColor: '#0A4D68'
    },
    delIcon: {
        width: 30,
        height: 30
    },
    addIcon: {
        width: 50,
        height: 50
    }

})

export default Home;