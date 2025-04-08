import { createContext } from 'react';

import { UsersState, UsersMethods } from './UsersProvider';

export type UsersContextValue = UsersState & UsersMethods;

export const UsersContext = createContext<UsersContextValue | null>(null);
