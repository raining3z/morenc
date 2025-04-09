import styled from 'styled-components';
import { ChangeEvent, type FormEvent, useState } from 'react';
import useSchoolsContext from '../../hooks/useSchoolsContext';
import MainContextProvider from '../../store/MainContextProvider';
import AddForm from '../../components/AddForm';
import Modal from '../../components/UI/Modal';
import { SchoolData, School } from '../../types/schools';

import Message from '../../components/Message';

const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  width: 100%;
`;

const Column = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  margin: 0;
  color: #333;
`;

const AddButton = styled.button`
  background-color: #0077cc;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #005fa3;
  }
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
`;

const ListItem = styled.li`
  background-color: white;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  font-size: 0.95rem;
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

const SchoolName = styled.div``;

const defaultFormData: SchoolData = {
  name: '',
  address: '',
  county: '',
};

export default function AdminSchoolsPage() {
  return (
    <MainContextProvider>
      <Schools />
    </MainContextProvider>
  );
}

function Schools() {
  const [SchoolAdded, setSchoolAdded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [formData, setFormData] = useState<SchoolData>(defaultFormData);
  // const [sortOption, setSortOption] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    schools,
    addSchool,
    deleteSchool,
    updateSchoolSubmit,
    isUpdating,
    updatingSchool,
    setUpdatingSchool,
    setIsUpdating,
  } = useSchoolsContext();

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function addHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      formData.name === '' ||
      formData.address === '' ||
      formData.county === ''
    ) {
      setHasError(true);
      return false;
    }

    if (isUpdating && updatingSchool) {
      updateSchoolSubmit({
        ...updatingSchool,
        ...formData,
      });

      // Reset update mode
      setIsUpdating(false);
      setUpdatingSchool(null);
    } else {
      addSchool({
        name: formData.name,
        address: formData.address,
        county: formData.county,
      });
    }

    setFormData(defaultFormData);

    setSchoolAdded(true);
    setHasError(false);
    setIsOpen(false);
  }

  function updateSchool(school: School) {
    setIsUpdating(true);
    setUpdatingSchool(school);

    setFormData({
      name: school.name,
      address: school.address,
      county: school.county,
    });
  }

  function ShowMessage() {
    if (hasError) {
      return <Message note="error">Error adding School</Message>;
    } else if (SchoolAdded) {
      return <Message note="success">School has been added</Message>;
    }
    return;
  }

  return (
    <Container>
      <Column>
        <Header>
          <Title>Schools</Title>

          <ShowMessage />
          <AddButton onClick={() => setIsOpen(true)}>Add School</AddButton>
        </Header>
        <List>
          {schools.map((school, index) => (
            <ListItem key={index}>
              <SchoolName>
                {school.name} / {school.address} / {school.county}
              </SchoolName>
              <ButtonGroup>
                <button onClick={() => updateSchool(school)}>Update</button>
                <button onClick={() => deleteSchool(school._id)}>Delete</button>
              </ButtonGroup>
            </ListItem>
          ))}
        </List>
      </Column>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <AddForm
          formOption="school"
          addHandler={addHandler}
          formData={formData}
          handleChange={handleChange}
          isUpdating={isUpdating}
          setIsOpen={setIsOpen}
        />
      </Modal>
    </Container>
  );
}
