import { EventsContext } from '../store/EventsContext';
import { useContext } from 'react';

export default function useEventsContext() {
  const eventsCtx = useContext(EventsContext);

  if (eventsCtx === null) {
    throw new Error('Events context is null');
  }

  return eventsCtx;
}
