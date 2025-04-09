import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from '../globalStyles';
import { theme } from '../theme';

import { ProjectsContextProvider } from './Projects/ProjectsProvider';
import { SchoolsContextProvider } from './Schools/SchoolsProvider';
import { UsersContextProvider } from './Users/UsersProvider';

interface MainProviderProps {
  children: ReactNode;
}

export default function MainContextProvider({ children }: MainProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <UsersContextProvider>
        <ProjectsContextProvider>
          <SchoolsContextProvider>{children}</SchoolsContextProvider>
        </ProjectsContextProvider>
      </UsersContextProvider>
    </ThemeProvider>
  );
}
