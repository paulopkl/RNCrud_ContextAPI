import React, { useContext } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { ListItem, Avatar, Button, Icon } from 'react-native-elements';
import UsersContext from '../context/UsersContext';

const UserList = props => {

    const context = useContext(UsersContext);
    const { dispatch } = context;

    const confirmUserDeletion = user => {
        Alert.alert('Delete User', 'Want to delete the user?', [
            { 
                text: 'Yes',
                onPress: () => {
                    dispatch({ 
                        type: 'deleteUser',
                        payload: user,
                    })
                }
            },{ text: 'No' }])
    }

    const getActions = user => (
        <>
            <Button
                type="clear"
                onPress={() => props.navigation.navigate('UserForm', user)}
                icon={<Icon name="edit" size={25} color="orange" />}
            />
            <Button
                type="clear"
                onPress={() => confirmUserDeletion(user)}
                icon={<Icon name="delete" size={25} color="red" />}
            />
        </>
    );

    const getUserItem = user => {
        return (
            // OLD VERSION
            // <ListItem 
            //     leftAvatar={{ source: { uri: user.item.avatarUrl } }} 
            //     key={user.item.id}
            //     title={user.item.name}
            //     subtitle={user.item.email}
            //     onPress={() => props.navigation.navigate({ name: 'UserForm' })}
            //     bottomDivider
            // />
            <ListItem 
                key={user.item.id} 
                onPress={() => props.navigation.navigate('UserForm', user)}
                bottomDivider>
                    <Avatar source={{ uri: user.item.avatarUrl }} />
                    <ListItem.Content>
                        <ListItem.Title>{user.item.name}</ListItem.Title>
                        <ListItem.Subtitle>{user.item.email}</ListItem.Subtitle>
                    </ListItem.Content>
                    {getActions(user.item)}
            </ListItem>
        )
    }

    return (
        <View>
            <FlatList
                data={context.state.users}
                keyExtractor={user => user.id.toString()}
                renderItem={getUserItem}
            />
        </View>
    );
}

export default UserList;