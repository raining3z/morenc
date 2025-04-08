import { UsersContextProvider } from './Users/UsersProvider';
import { ProjectsContextProvider } from './Projects/ProjectsProvider';
import { SchoolsContextProvider } from './Schools/SchoolsProvider';
import { ReactNode } from 'react';

interface MainProviderProps {
  children: ReactNode;
}

export default function MainContextProvider({ children }: MainProviderProps) {
  return (
    <UsersContextProvider>
      <ProjectsContextProvider>
        <SchoolsContextProvider>{children}</SchoolsContextProvider>
      </ProjectsContextProvider>
    </UsersContextProvider>
  );
}
