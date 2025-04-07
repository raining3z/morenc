import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../config';
import styled from 'styled-components';

import { Event } from '../types/events';

const { schools } = config;

const ProductItem = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: transform 0.2s ease;

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

const EventName = styled.div`
  font-weight: 600;
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

export default function EventDetails() {
  const [event, setEvent] = useState<Event>();
  const { _id: eventId } = useParams();

  useEffect(() => {
    if (!eventId) return;

    async function fetchProduct() {
      try {
        const response = await fetch(`/api/events/${eventId}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProduct();
  }, [eventId]);

  if (!event) {
    return <p>Loading event...</p>;
  }

  const school = schools.find((school) => school.id === event.schoolId);
  const schoolName = school?.name;

  return (
    <ProductItem>
      <img
        src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3917376.png&w=350&h=254"
        alt={event.eventName}
      />

      <SchoolName>{schoolName}</SchoolName>

      <EventName>{event.eventName}</EventName>

      <Description>{event.description}</Description>

      <Date>{event.date}</Date>
      <TimeRange>
        {event.startTime} - {event.endTime}
      </TimeRange>
    </ProductItem>
  );
}
