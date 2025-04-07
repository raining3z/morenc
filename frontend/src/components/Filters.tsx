import { type RefObject, type ChangeEvent } from 'react';
import styled from 'styled-components';
import { type School } from '../config';

// TODO: organize the types.  above is being pulled from config, others from types

import { FaTimes } from 'react-icons/fa';

interface FilterProps {
  schools: School[];
  selectedFilters: string[];
  filterChange: (project: ChangeEvent<HTMLInputElement>) => void;
  deleteFilter: (_id: string) => void;
  inputRefs: RefObject<{ [key: string]: HTMLInputElement | null }>;
}

const FilterLabel = styled.h2`
  margin-bottom: 1rem;
`;

const FilterOptions = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 2rem;
`;

const FilterOption = styled.li`
  margin-bottom: 0.5rem;
`;

const FilterOptionLabel = styled.label`
  cursor: pointer;
`;

const FilterTags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const FilterTag = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 10px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 16px;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const DeleteFilter = styled(FaTimes)`
  margin-left: 5px;
`;

export default function Filters({
  schools,
  selectedFilters,
  filterChange,
  deleteFilter,
  inputRefs,
}: FilterProps) {
  return (
    <>
      <FilterTags>
        <FilterLabel>Filters</FilterLabel>
        {selectedFilters.map((filter) => {
          const schoolName = schools.find((school) => school._id === filter);

          return (
            <FilterTag key={filter} onClick={() => deleteFilter(filter)}>
              {schoolName?.name} <DeleteFilter />
            </FilterTag>
          );
        })}
      </FilterTags>
      <FilterOptions>
        {schools.map((school) => {
          console.log(school._id);
          const schoolName = school.name.replace(/\s+/g, '-');

          return (
            <FilterOption key={school._id}>
              <FilterOptionLabel htmlFor={schoolName}>
                <input
                  type="checkbox"
                  value={school._id}
                  id={schoolName}
                  onChange={filterChange}
                  ref={(el) => {
                    if (el) inputRefs.current[school._id] = el;
                  }}
                />{' '}
                {school.name}
              </FilterOptionLabel>
            </FilterOption>
          );
        })}
      </FilterOptions>
    </>
  );
}
