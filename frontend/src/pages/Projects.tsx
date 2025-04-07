import { ChangeEvent, type FormEvent, useState, useRef } from 'react';

import styled from 'styled-components';

import config from '../config';

import ProjectList from '../components/ProjectList';
import AddProjectForm from '../components/AddProjectForm';

import { ProjectData, Project } from '../types/projects';
import useProjectsContext from '../hooks/useProjectsContext';

import { ProjectsContextProvider } from '../store/ProjectsProvider';
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

const defaultFormData: ProjectData = {
  projectName: '',
  description: '',
  date: '',
  startTime: '',
  endTime: '',
  schoolId: 0,
};

export default function Projects() {
  return (
    <ProjectsContextProvider>
      <ProjectsProvider />
    </ProjectsContextProvider>
  );
}

function ProjectsProvider() {
  // const [projects, setProjects] = useState<Project[]>([]);
  const [projectAdded, setProjectAdded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [formData, setFormData] = useState<ProjectData>(defaultFormData);
  const [selectedFilters, setSelectedFilters] = useState<number[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  // const [sortOption, setSortOption] = useState<string>('');

  const inputRefs = useRef<HTMLInputElement[]>([]);

  function filterChange(event: ChangeEvent<HTMLInputElement>) {
    const { checked, value } = event.target;

    const sportId = +value;

    setSelectedFilters((prev) => {
      console.log(prev);
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

  // const [isUpdatingProject, setIsUpdatingProject] = useState<boolean>(false);
  // const [updatingProject, setUpdatingProject] = useState<Project | null>(null);

  const {
    projects,
    addProject,
    deleteProject,
    updateProjectSubmit,
    isUpdatingProject,
    updatingProject,
    setUpdatingProject,
    setIsUpdating,
  } = useProjectsContext();

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

  function addProjectHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      formData.projectName === '' ||
      formData.description === '' ||
      formData.date === '' ||
      formData.startTime === '' ||
      formData.endTime === ''
    ) {
      setHasError(true);
      return false;
    }

    if (isUpdatingProject && updatingProject) {
      console.log('updating');
      // Update existing project
      // setProjects((prevProjects) =>
      //   prevProjects.map((project) =>
      //     project._id === updatingproject._id
      //       ? {
      //           ...project,
      //
      //         }
      //       : project
      //   )
      // );

      updateProjectSubmit({
        // id: updatingproject._id,
        // projectName: formData.projectName,
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
      console.log('adding');
      // Add new project
      // const projectId = Math.random();
      // const newProject: Project = {
      //   id: projectId,
      //   projectName: formData.projectName,
      //   description: formData.description,
      //   date: formData.date,
      //   startTime: formData.startTime,
      //   endTime: formData.endTime,
      // };

      addProject({
        // id: projectId, // this should be set on backend.  watch for TS errors
        projectName: formData.projectName,
        description: formData.description,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        schoolId: +formData.schoolId,
      });

      //setProjects((prevProjects) => [...prevProjects, newProject]);
    }

    // Reset form after adding/updating
    setFormData(defaultFormData);

    setProjectAdded(true);
    setHasError(false);
  }

  // function deleteProject(id: number) {
  //   setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
  // }

  function updateProject(projectObj: Project) {
    // ** 'Project' because you need the _id from db/api
    setIsUpdating(true);
    setUpdatingProject(projectObj);

    setFormData({
      projectName: projectObj.projectName,
      description: projectObj.description,
      date: projectObj.date,
      startTime: projectObj.startTime,
      endTime: projectObj.endTime,
      schoolId: projectObj.schoolId,
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
          <AddProjectForm
            addProjectHandler={addProjectHandler}
            formData={formData}
            handleChange={handleChange}
            isUpdatingProject={isUpdatingProject}
          />
        </Modal>

        <ProjectList
          projects={projects}
          deleteProject={deleteProject}
          updateProject={updateProject}
          projectAdded={projectAdded}
          hasError={hasError}
        />
      </Grid>
    </>
  );
}
