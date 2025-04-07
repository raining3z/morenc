import { createContext } from 'react';

import { SchoolsState, SchoolsMethods } from './SchoolsProvider';

export type SchoolsContextValue = SchoolsState & SchoolsMethods;

export const SchoolsContext = createContext<SchoolsContextValue | null>(null);
