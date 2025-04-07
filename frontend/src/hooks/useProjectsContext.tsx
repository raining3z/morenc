import { ProjectsContext } from '../store/ProjectsContext';
import { useContext } from 'react';

export default function useProjectsContext() {
  const projectsCtx = useContext(ProjectsContext);

  if (projectsCtx === null) {
    throw new Error('Projects context is null');
  }

  return projectsCtx;
}
