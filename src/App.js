import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UserForm from './screens/UserForm';
import UserList from './screens/UserList';

import { UsersProvider } from './context/UsersContext';

import { Button, Icon } from 'react-native-elements';

const Stack = createStackNavigator();

const screenOption = {
    headerStyle: { backgroundColor: '#f4511e' },
    headerTintColor: '#FFF',
    headerTitleStyle: { fontWeight: 'bold'}
}

const headerRightComponent = option => (
    <Button 
        type="clear" 
        onPress={() => option.navigation.navigate('UserForm')}
        icon={<Icon name="add" size={25} color="#FFF" />} 
    />
)

const App = () => (
    <UsersProvider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="UserList" screenOptions={screenOption}>
                <Stack.Screen 
                    name="UserList" 
                    component={UserList} 
                    options={option => ({ title: 'User List', headerRight: () => headerRightComponent(option) })} 
                />
                <Stack.Screen 
                    name="UserForm" 
                    component={UserForm} 
                    options={{ title: 'User Form' }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    </UsersProvider>
);

export default App;