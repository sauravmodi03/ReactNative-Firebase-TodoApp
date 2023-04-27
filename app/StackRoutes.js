import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Register from './screens/Register';
import DrawerRoutes from './DrawerRoutes';
import Welcome from './screens/Welcome';

function StackRoutes(props) {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home' screenOptions={{
                headerShown: false, headerStyle: {
                    backgroundColor: "blue", headerTintColor: '#fff'
                }
            }} >
                <Stack.Screen name='Welcome' component={Welcome} />
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Register' component={Register} />
                <Stack.Screen name='HomeScreen' component={DrawerRoutes} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackRoutes;