import React from 'react';
import { SafeAreaView, TextInput, View } from 'react-native';
import { styles } from '../components/Styles';
import { auth, db, dbName } from '../../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

function AddTodo(props) {

    const [user] = useAuthState(auth);

    const [task, setTask] = useState('');
    const [completed, setCompleted] = useState(false);

    const newTodo = {
        "task": app,
        "completed": completed
    }

    useEffect(() => {
    })


    const addNewDoc = async () => {
        if (task == "") {
            Alert.alert('Missing data', 'Please fill all the fields');
        } else {
            const ref = doc(db, dbName, user.uid);
            await updateDoc(ref, {
                todos: arrayUnion(newTodo)
            }).then((res) => {
                console.log('Successfully added new doc', res);
                props.navigation.navigate("Home");
            })
                .catch((err) => {
                    console.log('Error occured', err);
                });
        }
    }


    return (
        <SafeAreaView style={styles.flexCenter}>
            <View style={styles.header}>
                <Text onPress={() => props.navigation.navigate("Home")} style={styles.font}>Back</Text>
                <Text style={styles.font}>New Record</Text>
                <Text onPress={addNewDoc} style={styles.font}>Save</Text>
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    value={fname}
                    placeholder='First Name'
                    onChangeText={setFname}
                />
            </View>
        </SafeAreaView>
    );
}

export default AddTodo;