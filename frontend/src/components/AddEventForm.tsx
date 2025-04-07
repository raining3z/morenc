import { Input, Textarea, Button, Select } from './FormElements';
import { type EventData } from '../types/events';
import { type ChangeEvent, type FormEvent } from 'react';
import config from '../config';

import styled from 'styled-components';

const FormWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
`;

const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

const SubmitButtonWrapper = styled.div`
  grid-column: 2 / 3;
  display: flex;
  justify-content: flex-end;
`;

interface FormProps {
  addEventHandler: (event: FormEvent<HTMLFormElement>) => void;
  formData: EventData;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  isUpdatingEvent: boolean;
}

const { schools } = config;

export default function AddEventForm({
  addEventHandler,
  formData,
  handleChange,
  isUpdatingEvent,
}: FormProps) {
  return (
    <FormWrapper>
      <StyledForm onSubmit={addEventHandler}>
        <FullWidth>
          <Select
            defaultOption="Select School"
            field="schoolId"
            label="Select a School"
            options={schools}
            value={formData.schoolId}
            onChange={handleChange}
          />
        </FullWidth>
        <FullWidth>
          <Input
            field="eventName"
            label="Name"
            type="text"
            value={formData.eventName}
            onChange={handleChange}
          />
        </FullWidth>

        <FullWidth>
          <Textarea
            rows={10}
            cols={30}
            field="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
          />
        </FullWidth>

        <Input
          field="date"
          label="Date"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />

        <Input
          field="startTime"
          label="Start"
          type="time"
          value={formData.startTime}
          onChange={handleChange}
        />

        <FullWidth>
          <Input
            field="endTime"
            label="End"
            type="time"
            value={formData.endTime}
            onChange={handleChange}
          />
        </FullWidth>

        <SubmitButtonWrapper>
          {isUpdatingEvent ? (
            <Button>Update Event</Button>
          ) : (
            <Button>Add Event</Button>
          )}
        </SubmitButtonWrapper>
      </StyledForm>
    </FormWrapper>
  );
}
