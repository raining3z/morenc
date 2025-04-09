import { useContext } from 'react';

import { UsersContext } from '../store/Users/UsersContext';

export default function useUsersContext() {
  const usersCtx = useContext(UsersContext);

  if (usersCtx === null) {
    throw new Error('Users context is null');
  }

  return usersCtx;
}
