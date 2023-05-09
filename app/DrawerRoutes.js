import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import Home from './screens/Home';
import Account from './screens/Account';
import { Image, Text } from 'react-native-elements';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, dbName } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

function DrawerRoutes({ navigation }) {

    const Drawer = createDrawerNavigator();
    const [user] = useState(auth.currentUser);

    const singout = () => {
        signOut(auth).then((res) => {
            console.log("Successfully logged out..!!");
            navigation.navigate('Welcome');

        }).catch((err) => {
            console.log("Wrror while logging out..!!");
        });
    }

    const CustomDrawer = (props) => {
        return (
            <DrawerContentScrollView {...props}>
                <View style={st.headContainer}>
                    <View>
                        <Text>Hello {user.displayName}!</Text>
                        <Text>{user.email}</Text>
                    </View>
                    <Image style={{ width: 70, height: 70, borderRadius: 35 }} source={{ uri: user.photoURL }} />
                </View>
                <DrawerItemList style={st.menulist} {...props} />
                <TouchableOpacity onPress={singout} style={st.logout}><Text>Logout</Text></TouchableOpacity>
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    menulist: {
        flex: 1,
        height: '100%'
    },
    logout: {
        bottom: 0,
        paddingLeft: 20,
    },
});
export default DrawerRoutes;