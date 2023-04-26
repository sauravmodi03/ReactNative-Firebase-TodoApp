import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import Home from './screens/Home';

function DrawerRoutes(props) {

    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator>
            <Drawer.Screen name='Home' component={Home} options={{ title: 'Home' }} />
        </Drawer.Navigator>
    );
}

export default DrawerRoutes;