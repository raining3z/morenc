import styled from 'styled-components';

import AddForm from '../../components/AddForm';
import Modal from '../../components/UI/Modal';
import { useSchoolsContext, useForm } from '../../hooks';

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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
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

const SchoolName = styled.div`
  margin-bottom: 10px;
`;

export default function AdminSchoolsPage() {
  const formOption = 'school';

  const {
    addHandler,
    formData,
    handleChange,
    message,
    isModalOpen,
    setIsModalOpen,
    showFormOption,
    updateFormFields,
  } = useForm(formOption);

  const { schools, deleteSchool } = useSchoolsContext();

  // function ShowMessage() {
  //   if (hasError) {
  //     return <Message note="error">Error adding School</Message>;
  //   } else if (SchoolAdded) {
  //     return <Message note="success">School has been added</Message>;
  //   }
  //   return;
  // }

  return (
    <Container>
      <Column>
        <Header>
          <Title>Schools</Title>

          {/* <ShowMessage /> */}
          <AddButton onClick={() => showFormOption(formOption)}>
            Add School
          </AddButton>
        </Header>
        <List>
          {schools.map((school, index) => (
            <ListItem key={index}>
              <SchoolName>
                <SchoolName>{school.name}</SchoolName>{' '}
                <SchoolName>{school.address}</SchoolName>{' '}
                <SchoolName>{school.county}</SchoolName>
              </SchoolName>
              <ButtonGroup>
                <button onClick={() => updateFormFields(school)}>Update</button>
                <button onClick={() => deleteSchool(school._id)}>Delete</button>
              </ButtonGroup>
            </ListItem>
          ))}
        </List>
      </Column>

      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <AddForm
          formOption={formOption}
          addHandler={addHandler}
          formData={formData}
          handleChange={handleChange}
          buttonCopy="Add School"
          setIsOpen={setIsModalOpen}
          message={message}
        />
      </Modal>
    </Container>
  );
}
