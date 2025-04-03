import { ChangeEvent, type FormEvent, useState, useRef } from 'react';

import styled from 'styled-components';

import config from '../config';

import EventList from '../components/EventList';
import AddEventForm from '../components/AddEventForm';

import { Event, EventData } from '../types/events';
import useEventsContext from '../hooks/useEventsContext';

import { EventsContextProvider } from '../store/EventsProvider';
import Filters from '../components/Filters';
import Modal from '../components/UI/Modal';
import SearchField from '../components/Search';

const { schools } = config;

const Grid = styled.div`
  padding: 2em;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const SortByField = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 1rem;
`;

const LeftNav = styled.div`
  width: 250px;
  padding: 2rem;
  background: #f7f7f7;
  border-right: 1px solid #ddd;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }
`;

const defaultFormData: EventData = {
  eventName: '',
  description: '',
  date: '',
  startTime: '',
  endTime: '',
  schoolName: '',
  county: '',
};

export default function Events() {
  return (
    <EventsContextProvider>
      <EventsProvider />
    </EventsContextProvider>
  );
}

function EventsProvider() {
  // const [events, setEvents] = useState<Event[]>([]);
  const [eventAdded, setEventAdded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [formData, setFormData] = useState<EventData>(defaultFormData);
  const [selectedFilters, setSelectedFilters] = useState<number[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  // const [sortOption, setSortOption] = useState<string>('');

  const inputRefs = useRef<HTMLInputElement[]>([]);

  function filterChange(event: ChangeEvent<HTMLInputElement>) {
    const { checked, value } = event.target;

    const sportId = +value;

    setSelectedFilters((prev) => {
      if (checked) {
        return [...prev, sportId];
      } else {
        return prev.filter((sport) => sport !== sportId);
      }
    });
  }

  function deleteFilter(id: number) {
    inputRefs.current[id].checked = false;

    setSelectedFilters((prev) => {
      return prev.filter((filter) => filter !== id);
    });
  }

  function searchResults(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setSearchInput(value);
  }

  // function sortBy(event: ChangeEvent<HTMLSelectElement>) {
  //   const { value } = event.target;

  //   setSortOption(value);
  // }

  // function showSortOption(option: string, data: Player[]) {
  //   if (option === 'desc') {
  //     data.sort((a, b) => b.profile.lastName.localeCompare(a.profile.lastName));
  //   } else {
  //     data.sort((a, b) => a.profile.lastName.localeCompare(b.profile.lastName));
  //   }
  // }

  // TODO: add try/catch to all awaits
  // TODO: console.error OR throw new Error??

  // const [isUpdatingEvent, setIsUpdatingEvent] = useState<boolean>(false);
  // const [updatingEvent, setUpdatingEvent] = useState<Event | null>(null);

  const {
    events,
    addEvent,
    deleteEvent,
    updateEventSubmit,
    isUpdatingEvent,
    updatingEvent,
    setUpdatingEvent,
    setIsUpdating,
  } = useEventsContext();

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    console.log(name);
    console.log(value);

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function addEventHandler(event: FormEvent<HTMLFormElement>) {
    console.log('hello');
    event.preventDefault();

    if (
      formData.eventName === '' ||
      formData.description === '' ||
      formData.date === '' ||
      formData.startTime === '' ||
      formData.endTime === ''
    ) {
      setHasError(true);
      return false;
    }

    if (isUpdatingEvent && updatingEvent) {
      console.log('updating');
      // Update existing event
      // setEvents((prevEvents) =>
      //   prevEvents.map((event) =>
      //     event.id === updatingEvent.id
      //       ? {
      //           ...event,
      //
      //         }
      //       : event
      //   )
      // );

      updateEventSubmit({
        // id: updatingEvent.id,
        // eventName: formData.eventName,
        // description: formData.description,
        // date: formData.date,
        // startTime: formData.startTime,
        // endTime: formData.endTime,
        // Do the below instead of above...when you can
        ...updatingEvent, // Keeps the existing ID and any other properties
        ...formData, // Overwrites only the updated fields
      });

      // Reset update mode
      setIsUpdating(false);
      setUpdatingEvent(null);
    } else {
      console.log('adding');
      // Add new event
      const eventId = Math.random();
      // const newEvent: Event = {
      //   id: eventId,
      //   eventName: formData.eventName,
      //   description: formData.description,
      //   date: formData.date,
      //   startTime: formData.startTime,
      //   endTime: formData.endTime,
      // };

      addEvent({
        id: eventId,
        eventName: formData.eventName,
        description: formData.description,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        schoolName: formData.schoolName,
        county: formData.county,
      });

      //setEvents((prevEvents) => [...prevEvents, newEvent]);
    }

    // Reset form after adding/updating
    setFormData(defaultFormData);

    setEventAdded(true);
    setHasError(false);
  }

  // function deleteEvent(id: number) {
  //   setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  // }

  function updateEvent(eventObj: Event) {
    setIsUpdating(true);
    setUpdatingEvent(eventObj);

    setFormData({
      eventName: eventObj.eventName,
      description: eventObj.description,
      date: eventObj.date,
      startTime: eventObj.startTime,
      endTime: eventObj.endTime,
      schoolName: eventObj.schoolName,
      county: eventObj.schoolName,
    });
  }

  return (
    <>
      <LeftNav>
        <SearchField searchInput={searchInput} searchResults={searchResults} />
        <Filters
          schools={schools}
          selectedFilters={selectedFilters}
          filterChange={filterChange}
          deleteFilter={deleteFilter}
          inputRefs={inputRefs}
        />
      </LeftNav>
      <Grid>
        <SortByField>
          {/* <select value={sortOption} onChange={sortBy}>
              <option value="">Sort By</option>
              <option value="asc">Ascending</option>
              <option value="desc">Desceding</option>
            </select> */}
          sort by field
        </SortByField>
        <Modal>
          <AddEventForm
            addEventHandler={addEventHandler}
            formData={formData}
            handleChange={handleChange}
            isUpdatingEvent={isUpdatingEvent}
          />
        </Modal>

        <EventList
          events={events}
          deleteEvent={deleteEvent}
          updateEvent={updateEvent}
          eventAdded={eventAdded}
          hasError={hasError}
        />
      </Grid>
    </>
  );
}
