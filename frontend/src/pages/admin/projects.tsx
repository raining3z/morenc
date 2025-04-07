import styled from 'styled-components';
import { ChangeEvent, type FormEvent, useState } from 'react';
import useProjectsContext from '../../hooks/useProjectsContext';
import { ProjectsContextProvider } from '../../store/Projects/ProjectsProvider';
import AddForm from '../../components/AddForm';
import Modal from '../../components/UI/Modal';
import { ProjectData, Project } from '../../types/projects';

import { Link } from 'react-router-dom';

import Message from '../../components/Message';
import useSchoolsContext from '../../hooks/useSchoolsContext';
import { SchoolsContextProvider } from '../../store/Schools/SchoolsProvider';

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

const defaultFormData: ProjectData = {
  name: '',
  description: '',
  date: '',
  startTime: '',
  endTime: '',
  schoolId: '',
};

export default function AdminProjectsPage() {
  return (
    <ProjectsContextProvider>
      <SchoolsContextProvider>
        <Projects />
      </SchoolsContextProvider>
    </ProjectsContextProvider>
  );
}

function Projects() {
  const [projectAdded, setProjectAdded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [formData, setFormData] = useState<ProjectData>(defaultFormData);
  // const [sortOption, setSortOption] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    projects,
    addProject,
    deleteProject,
    updateProjectSubmit,
    isUpdating,
    updatingProject,
    setUpdatingProject,
    setIsUpdating,
  } = useProjectsContext();

  const { schools } = useSchoolsContext();

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
      formData.description === '' ||
      formData.date === '' ||
      formData.startTime === '' ||
      formData.endTime === ''
    ) {
      setHasError(true);
      return false;
    }

    if (isUpdating && updatingProject) {
      updateProjectSubmit({
        // id: updatingproject._id,
        // name: formData.name,
        // description: formData.description,
        // date: formData.date,
        // startTime: formData.startTime,
        // endTime: formData.endTime,
        // Do the below instead of above...when you can
        ...updatingProject, // Keeps the existing ID and any other properties
        ...formData, // Overwrites only the updated fields
      });

      // Reset update mode
      setIsUpdating(false);
      setUpdatingProject(null);
    } else {
      addProject({
        name: formData.name,
        description: formData.description,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        schoolId: formData.schoolId,
      });
    }

    setFormData(defaultFormData);

    setProjectAdded(true);
    setHasError(false);
    setIsOpen(false);
  }

  function updateProject(project: Project) {
    setIsUpdating(true);
    setUpdatingProject(project);

    setFormData({
      name: project.name,
      description: project.description,
      date: project.date,
      startTime: project.startTime,
      endTime: project.endTime,
      schoolId: project.schoolId,
    });
  }

  function ShowMessage() {
    if (hasError) {
      return <Message note="error">Error adding project</Message>;
    } else if (projectAdded) {
      return <Message note="success">Project has been added</Message>;
    }
    return;
  }

  return (
    <Container>
      <Column>
        <Header>
          <Title>Projects</Title>

          <ShowMessage />
          <AddButton onClick={() => setIsOpen(true)}>Add Project</AddButton>
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
                  <button onClick={() => updateProject(project)}>Update</button>
                  <button onClick={() => deleteProject(project._id)}>
                    Delete
                  </button>
                </ButtonGroup>
              </ListItem>
            );
          })}
        </List>
      </Column>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <AddForm
          formOption="project"
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
