import { type Project as ProjectProps } from '../types/projects';
import ProjectCard from './ProjectCard';
import Message from './Message';
import styled from 'styled-components';

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
`;

interface ProjectListProps {
  projects: ProjectProps[];
  projectAdded: boolean;
  hasError: boolean;
  deleteProject: (_id: string) => void;
  updateProject: (project: ProjectProps) => void;
}

export default function ProjectList({
  projects,
  projectAdded,
  hasError,
  deleteProject,
  updateProject,
}: ProjectListProps) {
  function ShowMessage() {
    if (hasError) {
      return <Message note="error">Error adding project</Message>;
    } else if (projectAdded) {
      return <Message note="success">Project has been added</Message>;
    }
    return;
  }

  return (
    <ProjectsGrid>
      {projects.map((project) => {
        return (
          <ProjectCard
            key={project._id}
            project={project}
            deleteProject={deleteProject}
            updateProject={updateProject}
          />
        );
      })}
      <ShowMessage />
    </ProjectsGrid>
  );
}
