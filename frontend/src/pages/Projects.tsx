import { type ChangeEvent, useState, useRef } from 'react';

import styled from 'styled-components';

import config from '../config';

import ProjectList from '../components/ProjectList';

import useProjectsContext from '../hooks/useProjectsContext';

import Filters from '../components/Filters';
import SearchField from '../components/Search';
import { ProjectsContextProvider } from '../store/Projects/ProjectsProvider';

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

export default function ProjectsPage() {
  return (
    <ProjectsContextProvider>
      <Projects />
    </ProjectsContextProvider>
  );
}

function Projects() {
  // const [projects, setProjects] = useState<Project[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<number[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  // const [sortOption, setSortOption] = useState<string>('');

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

  const { projects } = useProjectsContext();

  // function deleteProject(id: number) {
  //   setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
  // }

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

  const inputRefs = useRef<HTMLInputElement[]>([]);

  function deleteFilter(id: number) {
    inputRefs.current[id].checked = false;

    setSelectedFilters((prev) => {
      return prev.filter((filter) => filter !== id);
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

        <ProjectList
          projects={projects}
          // deleteProject={deleteProject}
          // updateProject={updateProject}
          // projectAdded={projectAdded}
          // hasError={hasError}
        />
      </Grid>
    </>
  );
}
