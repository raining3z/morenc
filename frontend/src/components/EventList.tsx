import { type Event as EventProps } from '../types/events';
import EventCard from './EventCard';
import Message from './Message';
import styled from 'styled-components';

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
`;

interface EventListProps {
  events: EventProps[];
  eventAdded: boolean;
  hasError: boolean;
  deleteEvent: (_id: string) => void;
  updateEvent: (event: EventProps) => void;
}

export default function EventList({
  events,
  eventAdded,
  hasError,
  deleteEvent,
  updateEvent,
}: EventListProps) {
  function ShowMessage() {
    if (hasError) {
      return <Message note="error">Error adding event</Message>;
    } else if (eventAdded) {
      return <Message note="success">Event has been added</Message>;
    }
    return;
  }

  return (
    <EventsGrid>
      {events.map((event) => {
        return (
          <EventCard
            key={event._id}
            event={event}
            deleteEvent={deleteEvent}
            updateEvent={updateEvent}
          />
        );
      })}
      <ShowMessage />
    </EventsGrid>
  );
}
