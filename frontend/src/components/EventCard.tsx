import { Link } from 'react-router-dom';
import { type Event } from '../types/events';

import styled from 'styled-components';

const ProductItem = styled.div`
  text-align: center;

  img {
    width: 100%;
  }
`;

interface EventProps {
  event: Event;
  deleteEvent: (id: number) => void;
  updateEvent: (event: Event) => void;
}

export default function EventCard({
  event,
  deleteEvent,
  updateEvent,
}: EventProps) {
  return (
    <ProductItem>
      <img
        src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3917376.png&w=350&h=254"
        alt={`${event.eventName}`}
      />
      <p>{event.id}</p>
      <p>
        <Link to={`/events/${event.eventName}`}>{event.eventName}</Link>
      </p>
      <p>{event.description}</p>
      <p>{event.date}</p>
      <p>
        {event.startTime} - {event.endTime}
      </p>
      <button onClick={() => updateEvent(event)}>Update</button>
      <button onClick={() => deleteEvent(event.id)}>Delete</button>
    </ProductItem>
  );
}
