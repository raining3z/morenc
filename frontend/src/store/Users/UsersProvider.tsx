// Notes
// Adding an user:
// _id is automatically generated by mongodb, so:
// - 'UserData' for when form is being submitted (addUserHandler)
// - 'User' when API creates/responds (AddAction / const addedUser)
// (
//    UserData: use for forms, API POST/PATCH bodies
//    User: use for anything that came from the database or API
// )

import { ReactNode, useEffect, useReducer } from 'react';

import { User, UserData, UserCredentials } from '../../types/users';

import { UsersContext, UsersContextValue } from './UsersContext';


export type UsersState = {
  users: User[];
  isUpdating: boolean;
  updatingUser: User | null;
};

const initialState: UsersState = {
  users: [],
  isUpdating: false,
  updatingUser: null,
};

export type UsersMethods = {
  addUser: (user: UserData) => Promise<UserData>;
  deleteUser: (_id: string) => void;
  loginUser: (user: UserCredentials) => void;
  updateUserSubmit: (user: User) => Promise<User>;
  setUpdatingUser: (user: User | null) => void;
  setIsUpdating: (status: boolean) => void;
};

type UsersContextProviderProps = {
  children: ReactNode;
};

type LoadAction = {
  type: 'LOAD_USERS';
  payload: User[];
};

type AddAction = {
  type: 'ADD_USER';
  payload: User;
};

type DeleteAction = {
  type: 'DELETE_USER';
  payload: string;
};

type LoginAction = {
  type: 'USER_LOGIN';
  payload: UserCredentials;
};

type UpdateAction = {
  type: 'UPDATE_USER';
  payload: User;
};

type SetUpdatingUserAction = {
  type: 'SET_UPDATING_USER';
  payload: User | null;
};

type SetIsUpdatingAction = {
  type: 'SET_IS_UPDATING';
  payload: boolean;
};

type Action =
  | LoadAction
  | AddAction
  | DeleteAction
  | UpdateAction
  | LoginAction
  | SetUpdatingUserAction
  | SetIsUpdatingAction;

function usersReducer(state: UsersState, action: Action): UsersState {
  switch (action.type) {
    case 'LOAD_USERS':
      return {
        ...state,
        users: action.payload,
      };
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id
            ? {
                ...action.payload,
              }
            : user
        ),
      };
    case 'SET_UPDATING_USER':
      return { ...state, updatingUser: action.payload };
    case 'SET_IS_UPDATING':
      return { ...state, isUpdating: action.payload };

    default:
      return state;
  }
}

export function UsersContextProvider({ children }: UsersContextProviderProps) {
  const [usersState, dispatch] = useReducer(usersReducer, initialState);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();

        dispatch({ type: 'LOAD_USERS', payload: data });
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsers();
  }, []);

  const ctx: UsersContextValue = {
    users: usersState.users,
    isUpdating: usersState.isUpdating,
    updatingUser: usersState.updatingUser,

    addUser: async (user: UserData) => {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          if (response.status === 409) {
            const data = await response.json();
            throw new Error(data.error);
          }
          throw new Error('Failed to add user');
        }

        const addedUser = await response.json();
        dispatch({ type: 'ADD_USER', payload: addedUser });

        return addedUser; // need this to await any response (i.e. on useForm)
      } catch (error) {
        console.error(error);
        throw error; // need this to show error (i.e. setMessage on useForm)
      }
    },

    deleteUser: async (userId: string) => {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Failed to delete user ${userId}`);
        }

        dispatch({ type: 'DELETE_USER', payload: userId });
      } catch (error) {
        console.error(error);
      }
    },

    updateUserSubmit: async (user: User) => {
      const { _id: userId } = user;
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          throw new Error(`Failed to update user ${userId}`);
        }

        const updatedUser = await response.json();
        dispatch({ type: 'UPDATE_USER', payload: updatedUser });

        return updatedUser;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    loginUser: async (user: UserCredentials) => {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error);
        }

        const loginUser = await response.json();
        dispatch({ type: 'USER_LOGIN', payload: loginUser });
        return loginUser;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    setUpdatingUser(user) {
      dispatch({ type: 'SET_UPDATING_USER', payload: user });
    },

    setIsUpdating(status) {
      dispatch({ type: 'SET_IS_UPDATING', payload: status });
    },
  };

  return <UsersContext.Provider value={ctx}>{children}</UsersContext.Provider>;
}
