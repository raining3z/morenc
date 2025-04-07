import { Link } from 'react-router-dom';
import { type Event } from '../types/events';
import config from '../config';

import styled from 'styled-components';

const ProductItem = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: transform 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: cover;
  }
`;

const SchoolName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
`;

const EventLink = styled(Link)`
  font-weight: 600;
  color: #0077cc;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #666;
`;

const Date = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  color: #444;
`;

const TimeRange = styled.span`
  font-size: 0.9rem;
  color: #555;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;

  button {
    flex: 1;
    padding: 0.5rem;
    border: none;
    border-radius: 6px;
    background-color: #f2f2f2;
    color: #333;
    cursor: pointer;
    font-weight: 500;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

interface EventProps {
  event: Event;
  deleteEvent: (_id: string) => void;
  updateEvent: (event: Event) => void;
}

const { schools } = config;

const isLoggedin: boolean = true;

export default function EventCard({
  event,
  deleteEvent,
  updateEvent,
}: EventProps) {
  const school = schools.find((school) => school.id === event.schoolId);
  const schoolName = school?.name;

  return (
    <ProductItem>
      <img
        src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3917376.png&w=350&h=254"
        alt={event.eventName}
      />

      <SchoolName>{schoolName}</SchoolName>

      <EventLink to={`/events/${event._id}`}>{event.eventName}</EventLink>

      <Description>{event.description}</Description>

      <Date>{event.date}</Date>
      <TimeRange>
        {event.startTime} - {event.endTime}
      </TimeRange>

      {isLoggedin && (
        <ButtonGroup>
          <button onClick={() => updateEvent(event)}>Update</button>
          <button onClick={() => deleteEvent(event._id)}>Delete</button>
        </ButtonGroup>
      )}
    </ProductItem>
  );
}
