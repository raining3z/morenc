import styled from 'styled-components';
import useProjectsContext from '../../hooks/useProjectsContext';
import AddForm from '../../components/AddForm';
import Modal from '../../components/UI/Modal';

import { Link } from 'react-router-dom';

import useSchoolsContext from '../../hooks/useSchoolsContext';
import useForm from '../../hooks/useForm';

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

const ProjectLink = styled(Link)``;

const Description = styled.div``;

const Date = styled.div``;

const TimeRange = styled.div``;

export default function AdminProjectsPage() {
  const formOption = 'project';

  const {
    addHandler,
    formData,
    handleChange,
    message,
    modalIsOpen,
    setModalIsOpen,
    showFormOption,
  } = useForm(formOption);

  const { projects, deleteProject } = useProjectsContext();

  const { schools } = useSchoolsContext();

  // function updateProject(project: Project) {
  //   setIsUpdating(true);
  //   setUpdatingProject(project);

  //   setFormData({
  //     name: project.name,
  //     description: project.description,
  //     date: project.date,
  //     startTime: project.startTime,
  //     endTime: project.endTime,
  //     schoolId: project.schoolId,
  //   });
  // }

  // function ShowMessage() {
  //   if (hasError) {
  //     return <Message note="error">Error adding project</Message>;
  //   } else if (projectAdded) {
  //     return <Message note="success">Project has been added</Message>;
  //   }
  //   return;
  // }

  return (
    <Container>
      <Column>
        <Header>
          <Title>Projects</Title>

          {/* <ShowMessage /> */}
          <AddButton onClick={() => showFormOption(formOption)}>
            Add Project
          </AddButton>
        </Header>
        <List>
          {projects.map((project, index) => {
            const school = schools.find(
              (school) => school._id === project.schoolId
            );
            const schoolName = school?.name;

            return (
              <ListItem key={index}>
                <SchoolName>{schoolName}</SchoolName>

                <ProjectLink to={`/projects/${project._id}`}>
                  {project.name}
                </ProjectLink>

                <Description>{project.description}</Description>

                <Date>{project.date}</Date>
                <TimeRange>
                  {project.startTime} - {project.endTime}
                </TimeRange>

                <ButtonGroup>
                  {/* <button onClick={() => updateProject(project)}>Update</button> */}
                  <button onClick={() => deleteProject(project._id)}>
                    Delete
                  </button>
                </ButtonGroup>
              </ListItem>
            );
          })}
        </List>
      </Column>

      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        <AddForm
          formOption={formOption}
          addHandler={addHandler}
          formData={formData}
          handleChange={handleChange}
          buttonCopy="Add Project"
          setIsOpen={setModalIsOpen}
          message={message}
        />
      </Modal>
    </Container>
  );
}
