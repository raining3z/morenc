import styled from 'styled-components';

import useSchoolsContext from '../hooks/useSchoolsContext';
import { type ProjectData } from '../types/projects';
import { type SchoolData } from '../types/schools';

import { Input, Textarea, Button, Select } from './FormElements';

import type { UserData, UserCredentials } from '../types/users';
import type { ChangeEvent, FormEvent } from 'react';

const FormWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FullWidth = styled.div`
  margin-bottom: 10px;
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 20px;
`;

interface FieldProps {
  formOption: string;
  formData: ProjectData | SchoolData | UserData | UserCredentials;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

interface FormProps extends FieldProps {
  addHandler: (event: FormEvent<HTMLFormElement>) => void;
  setIsOpen: (isOpen: boolean) => void;
  message: string;
  buttonCopy: string;
}

function FormFieldOptions({ formOption, formData, handleChange }: FieldProps) {
  switch (formOption) {
    case 'project': {
      const { schools } = useSchoolsContext();

      return (
        <>
          <FullWidth>
            <Select
              defaultOption="Select School"
              field="schoolId"
              label="Select a School"
              options={schools}
              value={(formData as ProjectData).schoolId}
              onChange={handleChange}
            />
          </FullWidth>
          <FullWidth>
            <Input
              field="name"
              label="Name"
              type="text"
              value={(formData as ProjectData).name}
              onChange={handleChange}
            />
          </FullWidth>
          <FullWidth>
            <Textarea
              rows={10}
              cols={30}
              field="description"
              label="Description"
              value={(formData as ProjectData).description}
              onChange={handleChange}
            />
          </FullWidth>
          <FullWidth>
            <Input
              field="date"
              label="Date"
              type="date"
              value={(formData as ProjectData).date}
              onChange={handleChange}
            />
          </FullWidth>
          <Input
            field="startTime"
            label="Start"
            type="time"
            value={(formData as ProjectData).startTime}
            onChange={handleChange}
          />
          <Input
            field="endTime"
            label="End"
            type="time"
            value={(formData as ProjectData).endTime}
            onChange={handleChange}
          />
        </>
      );
    }

    case 'school':
      return (
        <>
          <FullWidth>
            <Input
              field="name"
              label="Name"
              type="text"
              value={(formData as SchoolData).name}
              onChange={handleChange}
            />
          </FullWidth>
          <FullWidth>
            <Input
              field="address"
              label="Address"
              type="text"
              value={(formData as SchoolData).address}
              onChange={handleChange}
            />
          </FullWidth>
          <FullWidth>
            <Input
              field="county"
              label="County"
              type="text"
              value={(formData as SchoolData).county}
              onChange={handleChange}
            />
          </FullWidth>
        </>
      );

    case 'signup':
    case 'login':
      return (
        <>
          {formOption === 'signup' && (
            <>
              <FullWidth>
                <Input
                  field="firstName"
                  label="First Name"
                  type="text"
                  value={(formData as UserData).firstName}
                  onChange={handleChange}
                />
              </FullWidth>
              <FullWidth>
                <Input
                  field="lastName"
                  label="Last Name"
                  type="text"
                  value={(formData as UserData).lastName}
                  onChange={handleChange}
                />
              </FullWidth>
            </>
          )}

          <FullWidth>
            <Input
              field="email"
              label="Email"
              type="text"
              value={(formData as UserCredentials).email}
              onChange={handleChange}
            />
          </FullWidth>
          <FullWidth>
            <Input
              field="password"
              label="Password"
              type="password"
              value={(formData as UserCredentials).password}
              onChange={handleChange}
            />
          </FullWidth>
        </>
      );

    default:
      return null;
  }
}

export default function AddForm({
  addHandler,
  formData,
  handleChange,
  formOption,
  message,
  buttonCopy,
}: FormProps) {
  return (
    <FormWrapper>
      <StyledForm onSubmit={addHandler}>
        <FormFieldOptions
          formOption={formOption}
          formData={formData}
          handleChange={handleChange}
        />

        <SubmitButtonWrapper>
          <Button>{buttonCopy}</Button>
        </SubmitButtonWrapper>
        {message && <ErrorMessage>{message}</ErrorMessage>}
      </StyledForm>
    </FormWrapper>
  );
}
