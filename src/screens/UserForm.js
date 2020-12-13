import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import UsersContext from '../context/UsersContext';

const UserForm = props => {
    // console.warn(Object.keys(props.route.params));
    const [user, setUser] = useState(props.route.params ? props.route.params : {});

    const context = useContext(UsersContext);
    const { dispatch } = context;

    const saveUser = () => {
        dispatch({ type: user.id ? 'updateUser' : 'createUser', payload: user });
        
        props.navigation.goBack();
    }

    return (
        <View style={styles.form}>
            <Text>Name</Text>
            <TextInput
                placeholder="Enter Name"
                onChangeText={text => setUser({ ...user, name: text })}
                value={user.name}
                style={styles.input}
            />
            <Text>Email</Text>
            <TextInput
                placeholder="Enter email"
                onChangeText={text => setUser({ ...user, email: text })}
                value={user.email}
                style={styles.input}
            />
            <Text>URL do Avatar</Text>
            <TextInput
                placeholder="Enter email"
                onChangeText={text => setUser({ ...user, avatarUrl: text })}
                value={user.avatarUrl}
                style={styles.input}
            />
            <Button title="Save" onPress={saveUser} />
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        padding: 3 * 5,
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    }
})

export default UserForm;