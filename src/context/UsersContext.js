import React, { createContext, useReducer } from 'react';
import users from '../data/user';

const UsersContext = createContext({});

const initialState = { users: users }

const actions = {
    createUser: (state, action) => {
        const user = action.payload;
        user.id = Math.random() * 100;

        return {
            ...state,
            users: [...state.users, user]
        }
    },
    
    updateUser: (state, action) => {
        const user = action.payload;

        return {
            ...state,
            users: state.users.map(u => u.id === user.id ? user : u)
        }
    },

    deleteUser: (state, action) => {
        if (action.type === 'deleteUser') {
            const user = action.payload;
            return {
                ...state,
                users: state.users.filter(u => u.id !== user.id)
            }
        }
    }
}

export const UsersProvider = props => {

    const reducer = (state, action) => { 
        const fn = actions[action.type]
        return fn ? fn(state, action) : state;
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UsersContext.Provider value={{ state: state, dispatch: dispatch }}>
            {props.children}
        </UsersContext.Provider>
    );
}

export default UsersContext;