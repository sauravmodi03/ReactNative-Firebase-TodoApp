import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import Home from './screens/Home';
import Account from './screens/Account';
import { Text } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, dbName } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

function DrawerRoutes(props) {

    const Drawer = createDrawerNavigator();
    const [user] = useAuthState(auth);
    const [userData, setUser] = useState({});

    const loadUserData = async () => {
        const ref = doc(db, dbName, user.uid);
        await getDoc(ref).then((res) => {
            setUser(res.data());
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        loadUserData();
    }, []);

    const CustomDrawer = (props) => {
        return (
            <DrawerContentScrollView {...props}>
                <View style={st.headContainer}>
                    <Text>Hello {userData.fname}!</Text>
                    <Text>{userData.email}</Text>
                </View>
                <DrawerItemList {...props} />
                <Text>Logout</Text>
            </DrawerContentScrollView>
        );
    }

    return (
        <Drawer.Navigator screenOptions={{
            drawerPosition: 'left', swipeEnabled: true
        }} drawerContent={(props) => <CustomDrawer {...props} />}>
            <Drawer.Screen name='Home' component={Home} options={{ title: 'Home' }} />
            <Drawer.Screen name='Account' component={Account} options={{ title: 'Account' }} />
        </Drawer.Navigator>
    );
}

const st = StyleSheet.create({
    headContainer: {
        flex: 1,
        padding: 10,
        marginTop: 40,
    }
});
export default DrawerRoutes;