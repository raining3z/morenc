import { UsersContextProvider } from './Users/UsersProvider';
import { ProjectsContextProvider } from './Projects/ProjectsProvider';
import { SchoolsContextProvider } from './Schools/SchoolsProvider';
import { ReactNode } from 'react';

import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import { GlobalStyle } from '../globalStyles';

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
