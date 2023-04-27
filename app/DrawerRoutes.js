import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import Home from './screens/Home';
import Account from './screens/Account';

function DrawerRoutes(props) {

    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator screenOptions={{
            drawerPosition: 'left', swipeEnabled: true
        }}>
            <Drawer.Screen name='Home' component={Home} options={{ title: 'Home' }} />
            <Drawer.Screen name='Account' component={Account} options={{ title: 'Account' }} />
        </Drawer.Navigator>
    );
}

export default DrawerRoutes;