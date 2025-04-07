import { createContext } from 'react';

import { ProjectsState, ProjectsMethods } from './ProjectsProvider';

export type ProjectsContextValue = ProjectsState & ProjectsMethods;

export const ProjectsContext = createContext<ProjectsContextValue | null>(null);
