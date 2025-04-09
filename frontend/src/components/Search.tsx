import { type ChangeEvent } from 'react';
import styled from 'styled-components';

interface SearchProps {
  searchInput: string;
  searchResults: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Search = styled.div``;

const SearchLabel = styled.h2`
  margin-bottom: 1rem;
`;

export default function SearchField({
  searchInput,
  searchResults,
}: SearchProps) {
  return (
    <Search>
      <SearchLabel>Search</SearchLabel>
      <input
        type="text"
        value={searchInput}
        onChange={searchResults}
        placeholder="Search players"
      />
    </Search>
  );
}
