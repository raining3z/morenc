import { ReactNode, useReducer } from 'react';
import { EventsContext, EventsContextValue } from './EventsContext';

import { Event } from '../types/events';

import { events } from '../data';

export type EventsState = {
  events: Event[];
  isUpdatingEvent: boolean;
  updatingEvent: Event | null;
};

const initialState: EventsState = {
  events,
  isUpdatingEvent: false,
  updatingEvent: null,
};

export type EventsMethods = {
  addEvent: (event: Event) => void;
  deleteEvent: (id: number) => void;
  updateEventSubmit: (event: Event) => void;
  setUpdatingEvent: (event: Event | null) => void;
  setIsUpdating: (status: boolean) => void;
};

type EventsContextProviderProps = {
  children: ReactNode;
};

type AddAction = {
  type: 'ADD_EVENT';
  payload: Event;
};

type DeleteAction = {
  type: 'DELETE_EVENT';
  payload: number;
};

type UpdateAction = {
  type: 'UPDATE_EVENT';
  payload: Event;
};

type SetUpdatingEventAction = {
  type: 'SET_UPDATING_EVENT';
  payload: Event | null;
};

type SetIsUpdatingAction = {
  type: 'SET_IS_UPDATING';
  payload: boolean;
};

type Action =
  | AddAction
  | DeleteAction
  | UpdateAction
  | SetUpdatingEventAction
  | SetIsUpdatingAction;

function eventsReducer(state: EventsState, action: Action): EventsState {
  switch (action.type) {
    case 'ADD_EVENT':
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id
            ? {
                ...action.payload,
              }
            : event
        ),
      };
    case 'SET_UPDATING_EVENT':
      return { ...state, updatingEvent: action.payload };
    case 'SET_IS_UPDATING':
      return { ...state, isUpdatingEvent: action.payload };

    default:
      return state;
  }
}

export function EventsContextProvider({
  children,
}: EventsContextProviderProps) {
  const [eventsState, dispatch] = useReducer(eventsReducer, initialState);

  const ctx: EventsContextValue = {
    events: eventsState.events,
    isUpdatingEvent: eventsState.isUpdatingEvent,
    updatingEvent: eventsState.updatingEvent,
    addEvent(event) {
      dispatch({ type: 'ADD_EVENT', payload: event });
    },
    deleteEvent(id) {
      dispatch({ type: 'DELETE_EVENT', payload: id });
    },
    updateEventSubmit(event) {
      dispatch({ type: 'UPDATE_EVENT', payload: event });
    },
    setUpdatingEvent(event) {
      dispatch({ type: 'SET_UPDATING_EVENT', payload: event });
    },
    setIsUpdating(status) {
      dispatch({ type: 'SET_IS_UPDATING', payload: status });
    },
  };

  return (
    <EventsContext.Provider value={ctx}>{children}</EventsContext.Provider>
  );
}
