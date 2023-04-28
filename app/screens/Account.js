import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native';
import { styles } from '../components/Styles'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, dbName, storage } from '../../firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Image, Text } from 'react-native-elements';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import { ImagePickerIOS } from 'react-native';

function Account(props) {

    const [user] = useAuthState(auth);
    const [userData, setUser] = useState({});

    const [image, setImage] = useState(null);

    // const ImagePicker = require('react-native-image-picker');

    const onSelectImagePress = () => launchImageLibrary({ mediaType: 'photo' }, onMediaSelect);

    // const ref = storage.ref('images/' + user.uid + '/avatar.png');

    const onMediaSelect = async (media) => {
        if (!media.didCancel) {
            console.log("Uploading");
            const reference = ref(storage, 'images/' + media.assets[0].fileName);
            uploadBytes(reference, media).then((res) => {
                console.log(res);
                Alert.alert("Image uploaded");
                getDownloadURL(reference).then((res) => {
                    console.log(res);
                });
            }).catch((err) => {
                console.log(err);
            });


        }
    };

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
                <Image source={'https://firebasestorage.googleapis.com/v0/b/todo-bcea1.appspot.com/o/images%2Favatar.png?alt=media&token=e8feb75a-4372-4378-8ab6-03a888d7058b'} />
                <TouchableOpacity onPress={onSelectImagePress}><Text>Upload Pic</Text></TouchableOpacity>
            </View>
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