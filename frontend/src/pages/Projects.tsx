import { type ChangeEvent, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import Filters from '../components/Filters';
import ProjectList from '../components/ProjectList';
import SearchField from '../components/Search';
import { useProjectsContext, useSchoolsContext } from '../hooks';
import { Project } from '../types/projects';

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
  const [filteredProjects, setFilterProjects] = useState<Project[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
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
  const { schools } = useSchoolsContext();

  // function deleteProject(id: number) {
  //   setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
  // }

  function filterChange(event: ChangeEvent<HTMLInputElement>) {
    const { checked, value } = event.target;

    const schoolId = value;

    setSelectedFilters((prev) => {
      if (checked) {
        return [...prev, schoolId];
      } else {
        return prev.filter((school) => school !== schoolId);
      }
    });
  }

  const inputRefs = useRef<{ [id: string]: HTMLInputElement | null }>({});

  function deleteFilter(_id: string) {
    //inputRefs.current[_id]?.checked = false;

    const input = inputRefs.current[_id];
    if (input) {
      input.checked = false;
    }

    setSelectedFilters((prev) => {
      return prev.filter((filter) => filter !== _id);
    });
  }

  useEffect(() => {
    if (selectedFilters.length === 0) {
      setFilterProjects(projects);
    } else {
      const filtered = projects.filter((project) =>
        selectedFilters.includes(project.schoolId)
      );
      setFilterProjects(filtered);
    }
  }, [selectedFilters, projects]);

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
          projects={filteredProjects}
          // deleteProject={deleteProject}
          // updateProject={updateProject}
          // projectAdded={projectAdded}
          // hasError={hasError}
        />
      </Grid>
    </>
  );
}
