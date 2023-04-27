import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { styles } from '../components/Styles';
import { auth, db, dbName } from '../../firebaseConfig';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

function AddTodo(props) {

    const [user] = useAuthState(auth);

    const [task, setTask] = useState('');
    const [completed, setCompleted] = useState(false);

    const newTodo = {
        "task": task,
        "completed": completed
    }

    const addNewDoc = async () => {
        console.log("triggered");
        if (task == "") {
            Alert.alert('Missing data', 'Please fill all the fields');
        } else {
            const ref = doc(db, dbName, user.uid);
            await updateDoc(ref, {
                todos: arrayUnion(newTodo)
            }).then((res) => {
                console.log('Successfully added new doc', res);
                Alert.alert('Todo', 'New Todo successfully added.', [
                    {
                        text: 'Ok',
                        onPress: () => props.setModal(false)
                    }
                ]);
            })
                .catch((err) => {
                    console.log('Error occured', err);
                });
        }
    }

    return (
        <View style={st.modal}>
            <View style={{}}>
                <Text style={styles.font}>Todo:</Text>
                <TextInput
                    style={styles.input}
                    value={task}
                    placeholder='Task'
                    onChangeText={setTask}
                />
            </View>
            <View style={st.btnWrapper}>
                <Text onPress={() => props.setModal(false)} style={styles.font}>Cancle</Text>
                <Text onPress={() => addNewDoc()} style={styles.font}>Add</Text>
            </View>
        </View>
    );
}

const st = StyleSheet.create({
    modal: {
        alignSelf: 'center',
        width: 400,
        backgroundColor: 'dodgerblue',
        borderRadius: 20,
        marginTop: '60%',
        justifyContent: 'center',
        padding: 20,
    },
    btnWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default AddTodo;