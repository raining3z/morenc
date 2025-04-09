import { useContext } from 'react';

import { ProjectsContext } from '../store/Projects/ProjectsContext';

export default function useProjectsContext() {
  const projectsCtx = useContext(ProjectsContext);

  if (projectsCtx === null) {
    throw new Error('Projects context is null');
  }

  return projectsCtx;
}
