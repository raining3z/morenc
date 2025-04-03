import { createContext } from 'react';

import { EventsState, EventsMethods } from './EventsProvider';

export type EventsContextValue = EventsState & EventsMethods;

export const EventsContext = createContext<EventsContextValue | null>(null);
