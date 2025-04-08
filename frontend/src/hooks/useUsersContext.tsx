import { UsersContext } from '../store/Users/UsersContext';
import { useContext } from 'react';

export default function useUsersContext() {
  const usersCtx = useContext(UsersContext);

  if (usersCtx === null) {
    throw new Error('Users context is null');
  }

  return usersCtx;
}
